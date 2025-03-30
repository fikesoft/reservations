import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import axios from 'axios'
import User from '../models/users'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// Load environment variables
dotenv.config();

// Define required environment variables
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const BACKEND_ORIGIN = process.env.BACKEND_ORIGIN;
const CLIENT_SECRET= process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = BACKEND_ORIGIN + "/auth/callback"



export const googleAuth = async (request: Request, response: Response): Promise<void> => {
    try {
        // Construct the Google OAuth URL
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;

        // Redirect the user to the Google OAuth URL
        response.redirect(googleAuthUrl);
    } catch (error: any) {
        response.status(500).json({ error: "Server error", details: error.message || "Unknown error" });
    }
};

export const googleAuthCallback = async (request: Request, response: Response): Promise<void> => {
    const code = request.query.code as string;

    try {
        const responseData = await axios.post('https://oauth2.googleapis.com/token', {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code',
            code,
        });

        const { access_token } = responseData.data;

        const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        const userData = userInfoResponse.data;
        console.log("User Data Received From Google:", userData);

        // Check if the user exists in the database
        let user = await User.findOne({ google_id: userData.id });
        let newUser = false;
        if (!user) {
            console.log("User not found in the database. Creating a new user...");
            newUser=true
            user = new User({
                google_id: userData.id,
                name: userData.name,
                email: userData.email,
                picture: userData.picture,
                isAdmin: false
            });

            try {
                await user.save();
                console.log("User saved successfully:", user);
                const token=jwt.sign(
                    {_id: user._id, name: user.name, email: user.email, picture: user.picture},
                    process.env.JWT_SECRET as string,
                    { expiresIn: '1d' })
                    response.redirect(`${process.env.ORIGIN}/callback?token=${token}`);
            } catch (saveError: any) {
                console.error("Error saving user to the database:", saveError.message);
                response.status(500).json({
                    error: "Error saving user to the database",
                    details: saveError.message
                });
                return;
            }
        } else {
            const token=jwt.sign(
                {_id: user._id, name: user.name, email: user.email, picture: user.picture},
                process.env.JWT_SECRET as string,
                { expiresIn: '1d' })
                response.redirect(`${process.env.ORIGIN}/callback?token=${token}`);
        }        
    } catch (error: any) {
        console.error("Server error:", error.message || error);
        response.status(500).json({
            error: "Server error",
            details: error.message || "Unknown error"
        });
    }
};




export const registerUser = async (request: Request, response: Response) :Promise<void> =>{
    try{
        const {name,email,password}= request.body
        
        if( !name || !email || !password ){
            response.status(400).json({error:"Some data is missing"})
            return
        }
        //Check if the  user has already an account 
        const exisitingUser = await User.findOne({email})

        if(exisitingUser){
            response.status(400).json({error:"You are already registered"})
            return
        }
        //Check if the user is the first one
        const isFirstUser  = (await User.countDocuments()) === 0; 
        
        const newUser = new User({
            name,
            email,
            password,
            isAdmin:isFirstUser
            })
        await newUser.save();
        response.status(201).json({ message: "User registered successfully", userId: newUser._id });

        return
    }catch(error:any){  
        response.status(500).json({error:"Server error" , details : error.message || "Unknown error"})
    }
}

export const loginUser = async (request: Request, response: Response): Promise<void> => {
    const { email, password } = request.body;

    // Check required fields
    if (!email || !password) {
        response.status(400).json({ error: "Email and password are required" });
        return;
    }

    try {
        const existingUser = await User.findOne({ email }).exec();

        // Check if user exists
        if (!existingUser) {
            response.status(404).json({ error: "User not found" });
            return;
        }

        // Check if user has a password (e.g., Google auth users might not)
        if (!existingUser.password) {
            response.status(400).json({ error: "Account registered via Google. Use Google login." });
            return;
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            response.status(401).json({ error: "Invalid email or password" });
            return;
        }

        // Successful login - send user data
        response.status(200).json({
            message: "Login successful",
            name: existingUser.name,
            email: existingUser.email,
            picture: existingUser.picture,
            isAdmin: existingUser.isAdmin
            
        });

    } catch (error) {
        console.error("Login error:", error);
        response.status(500).json({ error: "An unexpected error occurred" });
    }
};

import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';

export const hashPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { password } = req.body;
        if (!password) {
            res.status(400).json({ error: "Password is required." });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword; // Replace plain password with hashed one

        next(); // Proceed to the next middleware or route handler
    } catch (error:any) {
        console.error("Error hashing password:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
};



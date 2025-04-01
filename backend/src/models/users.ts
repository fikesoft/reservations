import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    google_id: { type: String, default: null, sparse: true},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    picture: { type: String, default: null },
    isAdmin: { type: Boolean, required: true }
});

const User = mongoose.model("Users", userSchema);
export default User;

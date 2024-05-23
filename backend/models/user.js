import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const UserSchema = mongoose.Schema(
    {
        fname: {
            type: String,
            required: true,
        },
        lname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
            
        },
        password: {
            type: String,
            required: true,
        },
        is_admin: {
            type: Boolean,
            default: false,
           
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return token;
};

const User = mongoose.model('User', UserSchema);

export default User;
import { Request, Response } from "express";
import User from "../models/User";
import { BadRequestError, ConflictError } from "../utils/https-error";
import bcrypt from "bcrypt"
import { sendMail } from "../utils/send-mail";

export const signup = async(req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    if(!firstName || !email || !password){
        throw BadRequestError("Missing parameters");
    }
    const isEmailExists = await User.findOne({email});

    if(isEmailExists){
        throw ConflictError("This email id is already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    await sendMail(email, otp);

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        otp,
        otpExpires
    });

    await user.save();

    

    return res.status(200).json({
        success: true,
        message: "User Created Successfully"
    })
}
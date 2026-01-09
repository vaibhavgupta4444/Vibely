import { Request, Response } from "express";
import User from "../models/User";

export const signup = async(req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        if(!firstName || !email || !password){
            throw Error("Missing parameters");
        }

        const isEmailExists = await User.findOne({email});

        if(isEmailExists){
            return res.status(409).json({
                success: false,
                message: "User with this email already exists"
            });
        }

        const user = await User.create({
            firstName,
            lastName,
            email,
            password
        });

        user.save();

        return res.status(200).json({
            success: true,
            message: "User Created Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error"
        })
    }
}
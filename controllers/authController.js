import { StatusCodes } from "http-status-codes";
import User from '../models/UserModel.js';
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
    req.body.role = "user";
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({"message": 'user created'});
}

export const login = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    const isVaildUser = user && (await comparePassword(req.body.password , user.password));
    if(!isVaildUser) throw new UnauthenticatedError('Invalid credentials');
    const token = createJWT({userId: user._id, role: user.role});
    const oneDay = 1000 * 60 * 60 * 24 ;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production'
    })
    res.status(StatusCodes.OK).json({message: 'login successful'});
}

export const logout = (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(Date.now())
    });
    res.status(StatusCodes.OK).json({message: 'Logged Out sucessfully'})
}
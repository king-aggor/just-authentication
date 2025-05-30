import { Request, Response, NextFunction } from "express";
import * as validation from "../middlewares/validation";
import * as bcrypt from "../utils/bcrypt";
import * as authenticationServices from "../services/authentication";
import * as jwt from "../utils/jwt";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const signUpData: {
    email: string;
    userName: string | undefined;
    password: string;
  } = req.body;
  try {
    await validation.signUpData(signUpData);
    const hasshedPassword = await bcrypt.hashPassword(signUpData.password);
    signUpData.password = hasshedPassword;
    const user = await authenticationServices.createUser(signUpData);
    const token = await jwt.generateToken({ email: user.email });
    const userData = {
      email: user.email,
      userName: user.userName,
      token: token,
    };
    res.status(201).json({
      message: `Sign up successfull`,
      userData,
    });
  } catch (err: any) {
    next({
      message: err.message,
      status: err.statusCode,
    });
  }
};

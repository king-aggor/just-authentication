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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loginData: {
    email: string | undefined;
    userName: string | undefined;
    password: string;
  } = req.body;
  let token: string;
  try {
    await validation.login(loginData);
    const user: {
      userName: string | undefined;
      email: string;
      password: string;
    } = await authenticationServices.userLogin(loginData);
    token = await jwt.generateToken({ email: user.email });
    const userData = {
      username: user.userName,
      email: user.email,
    };
    res.status(200).json({
      message: `Login successfull`,
      userData,
      token,
    });
  } catch (err: any) {
    next({
      message: err.message,
      status: err.statusCode,
    });
  }
};

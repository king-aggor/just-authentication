import jwt from "jsonwebtoken";
import CustomError from "./error";

//generate token
export const generateToken = async (payload: { email: string }) => {
  const jwtKey = process.env.JWT_SECRET;
  try {
    if (!jwtKey) {
      throw new CustomError("JWT key is not set", 500);
    }
    let token = jwt.sign(payload, jwtKey, {
      expiresIn: "1d",
      algorithm: "HS256",
    });
    token = `Bearer ${token}`;
    return token;
  } catch (err: any) {
    throw new CustomError(err.message, err.statusCode);
  }
};

import bcrypt from "bcrypt";
import CustomError from "./error";

export const hashPassword = async (password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (err: any) {
    throw new CustomError("bcrypt error: password hashing failed", 500);
  }
};

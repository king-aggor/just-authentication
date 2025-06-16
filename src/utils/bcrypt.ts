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

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (err: any) {
    throw new CustomError("bcrypt error: password comparison failed", 500);
  }
};

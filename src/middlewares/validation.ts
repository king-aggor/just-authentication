import CustomError from "../utils/error";

//signUpData Validation

export const signUpData = async (signUpData: {
  userName: string | undefined;
  email: string;
  password: string;
}) => {
  const { userName, email, password } = signUpData;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  try {
    // check if email password exist in signUpData
    if (!email || !password) {
      throw new CustomError("email and password are required", 400);
    }
    //check if email and password are strings
    if (typeof email != "string" || typeof password != "string") {
      throw new CustomError("email and password must be strings", 400);
    }
    //check if password is a minimum of 6 characters
    if (password.length < 6) {
      throw new CustomError("password must be 6 or more characters", 400);
    }
    //check if email matches email format
    if (!emailRegex.test(email)) {
      throw new CustomError("invlid email format", 400);
    }
    //if userName exists check if its a string
    if (userName && typeof userName != "string") {
      throw new CustomError("userName must be strings", 400);
    }
  } catch (err: any) {
    throw new CustomError(`Validation Error: ${err.message}`, 400);
  }
};

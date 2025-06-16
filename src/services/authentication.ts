// @ts-ignore
import { createClient } from "redis-mock";
import CustomError from "../utils/error";
import * as bcrypt from "../utils/bcrypt";

const client = createClient();

// Helper function to promisify Redis operations
const redisGet = (key: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    client.get(key, (err: any, reply: string | null) => {
      if (err) reject(err);
      resolve(reply);
    });
  });
};

const redisSet = (key: string, value: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    client.set(key, value, (err: any) => {
      if (err) reject(err);
      resolve();
    });
  });
};

export const createUser = async (signUpData: {
  userName: string | undefined;
  email: string;
  password: string;
}) => {
  const { userName, email, password } = signUpData;
  let user: {
    email: string;
    password: string;
    userName: string | undefined;
  } | null;
  try {
    // Check if email exists
    const existingUserByEmail = await redisGet(`user:${email}`);
    if (existingUserByEmail) {
      throw new CustomError("User with this email already exists", 409);
    }

    // Check if username is taken
    if (userName) {
      const existingUserByUsername = await redisGet(`username:${userName}`);
      if (existingUserByUsername) {
        throw new CustomError("Username is already taken", 409);
      }
    }

    const userData = {
      userName,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    // Store user data
    await redisSet(`user:${email}`, JSON.stringify(userData));

    // Store username mapping if provided
    if (userName) {
      await redisSet(`username:${userName}`, email);
    }

    // Retrieve stored user
    const userDataFromRedis = await redisGet(`user:${email}`);
    user = userDataFromRedis ? JSON.parse(userDataFromRedis) : null;

    //throw error if user is null
    if (!user) {
      throw new CustomError("Unable to signup user", 500);
    }

    return user;
  } catch (err: any) {
    throw new CustomError(
      `Service Error: ${err.message || "Unable to signup user"}`,
      err.statusCode || 500
    );
  }
};

//userLogin
export const userLogin = async (loginData: {
  email: string | undefined;
  userName: string | undefined;
  password: string;
}) => {
  const { email, userName, password } = loginData;
  try {
    let userData: {
      userName: string | undefined;
      email: string;
      password: string;
    } | null = null;

    // Find user by email or username
    if (email) {
      const rawData = await redisGet(`user:${email}`);
      userData = rawData ? JSON.parse(rawData) : null;
    } else if (userName) {
      const rawData = await redisGet(`username:${userName}`);
      userData = rawData ? JSON.parse(rawData) : null;
    }

    if (!userData) {
      throw new CustomError("User does not exist", 404);
    }

    //compare passwords
    const hashedPassword = userData.password;
    const isMatch = await bcrypt.comparePassword(password, hashedPassword);
    if (!isMatch) {
      throw new CustomError("Wrong password", 401);
    }

    return userData;
  } catch (err: any) {
    throw new CustomError(
      `Service Error: ${err.message || "Unable to login user"}`,
      err.statusCode || 500
    );
  }
};

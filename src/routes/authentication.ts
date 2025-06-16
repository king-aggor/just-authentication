import { Router } from "express";
import * as authenticationControllers from "../controllers/authentication";

const router = Router();

router.post("/signup", authenticationControllers.signUp); //signup route
router.post("/login", authenticationControllers.login); //login route

export default router;

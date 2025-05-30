import { Router } from "express";
import * as authenticationControllers from "../controllers/authentication";

const router = Router();

//signup route
router.post("/signup", authenticationControllers.signUp);

export default router;

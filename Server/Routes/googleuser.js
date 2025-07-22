import express from "express"
const router = express.Router();
import {googleLogin} from "../Controller/googlelogin.js"

router.post("/google-login", googleLogin);

export default router;

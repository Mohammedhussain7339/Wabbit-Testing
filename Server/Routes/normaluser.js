import express from "express"
const router = express.Router();
import {createNormaluser,getNormaluser} from "../Controller/normaluser.js"

router.post("/normaluser", createNormaluser);
router.get("/normaluser", getNormaluser);

export default router;

import express from "express"
import verifyToken from "../configs/verifyToken.js"


import { follow } from "../controllers/follow.js"


const router = express.Router()


router.patch('/follow/:userId', verifyToken, follow)


export default router
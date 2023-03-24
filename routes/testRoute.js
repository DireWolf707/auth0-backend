import express from "express"
import { publicMessage, privateMessage, adminMessage } from "../controllers/testController.js"
import { validateAccessToken } from "../middlewares/auth0.js"

const router = express.Router()
// router.route('')
router.get("/public", publicMessage)
router.get("/private", validateAccessToken, privateMessage)
router.get("/admin", validateAccessToken, adminMessage)

export default router

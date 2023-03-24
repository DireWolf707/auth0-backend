import express from "express"
import { publicMessage, privateMessage, adminMessage } from "../controllers/testController.js"
import { validateToken, checkPermissions } from "../middlewares/auth0.js"
import { AdminPermissions } from "../permissions/auth0.js"

const router = express.Router()
// router.route('')
router.get("/public", publicMessage)
router.get("/private", validateToken, privateMessage)
router.get("/admin", validateToken, checkPermissions([AdminPermissions.Read]), adminMessage)

export default router

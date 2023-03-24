import express from "express"
import { publicMessage, privateMessage, adminMessage, profile } from "../controllers/testController.js"
import { validateToken, checkPermissions, getUser } from "../middlewares/auth0.js"
import { AdminPermissions } from "../permissions/auth0.js"

const router = express.Router()
// router.route('')
router
  .get("/public", publicMessage)
  .get("/private", validateToken, privateMessage)
  .get("/admin", validateToken, checkPermissions([AdminPermissions.Read]), adminMessage)
  .get("/profile", validateToken, getUser, profile)

export default router

import express from "express"
import { validateToken } from "../middlewares/auth0.js"
import { updatePassword, updateProfile, updateAvatar, deleteAvatar } from "../controllers/userController.js"

const router = express.Router()
router.post("/profile", validateToken, updateProfile).post("/password", validateToken, updatePassword)
router.route("/avatar").post(validateToken, updateAvatar).delete(validateToken, deleteAvatar)

export default router

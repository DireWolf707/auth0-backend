import catchAsync from "../utils/catchAsync.js"
import auth0Client from "../configs/auth0/client.js"
import { v2 as cloudinary } from "cloudinary"
import AppError from "../utils/appError.js"
import { extractCloudinaryPublicId, isCloudinaryURL } from "../utils/cloudinary.js"

export const updateProfile = catchAsync(async (req, res, next) => {
  await auth0Client.updateUser({ id: req.auth.payload.sub }, { name: req.body.name })

  res.status(200).json({ status: "success", data: "Profile Updated Successfully!" })
})

export const updatePassword = catchAsync(async (req, res, next) => {
  await auth0Client.updateUser({ id: req.auth.payload.sub }, { password: req.body.password })

  res.status(200).json({ status: "success", data: "Password Updated Successfully!" })
})

export const updateAvatar = catchAsync(async (req, res, next) => {
  if (!req.files.file.mimetype.startsWith("image/")) throw new AppError("ImageError: Please upload a Image file!", 400)

  const avatar = await cloudinary.uploader.upload(req.files.file.tempFilePath) // upload on cloudinary
  await auth0Client.updateUser({ id: req.auth.payload.sub }, { picture: avatar.url }) // update user
  const prevAvatarURL = req.auth.payload.picture
  if (isCloudinaryURL(prevAvatarURL)) await cloudinary.uploader.destroy(extractCloudinaryPublicId(prevAvatarURL)) // delete on cloudinary

  res.status(200).json({ status: "success", data: "Avatar Updated Successfully!" })
})

export const deleteAvatar = catchAsync(async (req, res, next) => {
  const avatarURL = req.auth.payload.picture
  if (isCloudinaryURL(avatarURL)) await cloudinary.uploader.destroy(extractCloudinaryPublicId(avatarURL)) // delete on cloudinary
  await auth0Client.updateUser({ id: req.auth.payload.sub }, { picture: null }) // update user

  res.status(200).json({ status: "success", data: "Avatar Deleted Successfully!" })
})

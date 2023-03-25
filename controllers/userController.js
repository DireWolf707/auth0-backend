import catchAsync from "../utils/catchAsync.js"
import auth0Client from "../auth0-configs/client.js"

export const updateProfile = catchAsync(async (req, res, next) => {
  await auth0Client.updateUser({ id: req.auth.payload.sub }, { name: req.body.name })
  res.status(200).json({ status: "success", data: "Profile Updated Successfully!" })
})

export const updatePassword = catchAsync(async (req, res, next) => {
  await auth0Client.updateUser({ id: req.auth.payload.sub }, { password: req.body.password })
  res.status(200).json({ status: "success", data: "Password Updated Successfully!" })
})

export const updateAvatar = (req, res, next) => {
  res.json("ok")
}

export const deleteAvatar = catchAsync(async (req, res, next) => {
  await auth0Client.updateUser({ id: req.auth.payload.sub }, { picture: null })
  res.status(200).json({ status: "success", data: "Avatar Deleted Successfully!" })
})

import catchAsync from "../utils/catchAsync.js"

export const publicMessage = (req, res, next) => {
  res.status(200).json("This is a public message")
}

export const privateMessage = (req, res, next) => {
  res.status(200).json("This is a private message")
}

export const adminMessage = (req, res, next) => {
  res.status(200).json("This is a admin message")
}

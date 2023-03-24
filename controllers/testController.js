// import catchAsync from "../utils/catchAsync.js"

export const publicMessage = (req, res, next) => {
  res.status(200).json({ status: "success", data: "This is a public message" })
}

export const privateMessage = (req, res, next) => {
  res.status(200).json({ status: "success", data: "This is a private message" })
}

export const adminMessage = (req, res, next) => {
  res.status(200).json({ status: "success", data: "This is a admin message" })
}

export const profile = (req, res, next) => {
  res.status(200).json({ status: "success", data: req.user })
}

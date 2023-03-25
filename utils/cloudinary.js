import url from "url"

export const extractCloudinaryPublicId = (imageURL) => imageURL.split("/").pop().split(".")[0]

export const isCloudinaryURL = (imageURL) => imageURL && url.parse(imageURL).host === "res.cloudinary.com"

import { auth } from "express-oauth2-jwt-bearer"
import dotenv from "dotenv"

dotenv.config({ path: process.env.NODE_ENV === "production" ? "./.env.prod" : "./.env" })

export const validateAccessToken = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: process.env.AUTH0_AUDIENCE,
  tokenSigningAlg: "RS256",
})

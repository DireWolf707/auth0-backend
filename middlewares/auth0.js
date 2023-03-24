import { auth, claimCheck, InsufficientScopeError } from "express-oauth2-jwt-bearer"
import dotenv from "dotenv"

dotenv.config({ path: process.env.NODE_ENV === "production" ? "./.env.prod" : "./.env" })

export const validateToken = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: process.env.AUTH0_AUDIENCE,
  tokenSigningAlg: "RS256",
})

export const checkPermissions = (requiredPermissions) => {
  return (req, res, next) => {
    const permissionCheck = claimCheck((payload) => {
      const permissions = payload.permissions || [] // user permissions
      const hasPermissions = requiredPermissions.every((requiredPermission) => permissions.includes(requiredPermission))
      if (!hasPermissions) throw new InsufficientScopeError()
      return hasPermissions
    })

    permissionCheck(req, res, next)
  }
}

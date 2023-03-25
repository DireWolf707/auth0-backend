import { auth, claimCheck, InsufficientScopeError } from "express-oauth2-jwt-bearer"
import axios from "axios"
import catchAsync from "../utils/catchAsync.js"

const AUTH0_DOMAIN = `https://${process.env.AUTH0_DOMAIN}`

export const validateToken = auth({
  issuerBaseURL: AUTH0_DOMAIN,
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

export const getUser = catchAsync(async (req, res, next) => {
  const resp = await axios.get(`${AUTH0_DOMAIN}/userinfo`, { headers: { authorization: req.headers.authorization } })
  req.user = resp.data
  next()
})

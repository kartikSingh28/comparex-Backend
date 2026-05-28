import { Request } from "express"
import { UserRole } from "./enum"

export interface JwtPayload {
  userId: string
  role: UserRole
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload
}

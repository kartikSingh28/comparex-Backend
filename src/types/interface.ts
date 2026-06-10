import { Request } from "express"
import { UserRole } from "./enum"


export interface JwtPayload {
  userId: string
  role: UserRole
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload
}

export const PERMISSIONS: Record<string, UserRole[]> = {
  // Master Admin only
  "admin:approve-payout":      [UserRole.MASTER_ADMIN],
  "admin:view-audit-logs":     [UserRole.MASTER_ADMIN],
  "admin:configure-mdr":       [UserRole.MASTER_ADMIN],
  "admin:manage-users":        [UserRole.MASTER_ADMIN],
  "admin:onboard-pg": [UserRole.MASTER_ADMIN],

  // Sub Admin
  "lead:qualify":              [UserRole.MASTER_ADMIN, UserRole.SUB_ADMIN],
  "lead:assign-to-pg":         [UserRole.MASTER_ADMIN, UserRole.SUB_ADMIN],
  "lead:view-all":             [UserRole.MASTER_ADMIN, UserRole.SUB_ADMIN],

  // PG Admin
  "pg:update-profile":         [UserRole.MASTER_ADMIN, UserRole.PG_ADMIN],
  "pg:view-own-leads":         [UserRole.MASTER_ADMIN, UserRole.PG_ADMIN],
  "pg:update-lead-status":     [UserRole.MASTER_ADMIN, UserRole.PG_ADMIN],

  // Reseller
  "reseller:view-own-leads":   [UserRole.MASTER_ADMIN, UserRole.RESELLER],
  "reseller:view-commission":  [UserRole.MASTER_ADMIN, UserRole.RESELLER],
  "reseller:upload-kyc":       [UserRole.MASTER_ADMIN, UserRole.RESELLER],

  // Merchant
  "merchant:submit-review":    [UserRole.MASTER_ADMIN, UserRole.MERCHANT],
  "merchant:view-own-leads":   [UserRole.MASTER_ADMIN, UserRole.MERCHANT],
};
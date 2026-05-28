export enum UserRole {
  MASTER_ADMIN = "MASTER_ADMIN",
  SUB_ADMIN = "SUB_ADMIN",
  PG_ADMIN = "PG_ADMIN",
  RESELLER = "RESELLER",
  MERCHANT = "MERCHANT",
}

export enum LeadStatus {
  NEW = "NEW",
  IN_REVIEW = "IN_REVIEW",
  QUALIFIED = "QUALIFIED",
  ASSIGNED = "ASSIGNED",
  LIVE = "LIVE",
  REJECTED = "REJECTED",
}


export enum CommissionStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  PAID = "PAID",
}

export enum KYCStatus {
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  REJECTED = "REJECTED",
}

export enum PGStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
}

export enum ReviewStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum PayoutStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}
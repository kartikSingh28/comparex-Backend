# 🔄 Comparex

**Compare. Choose. Go Live.**

Comparex is a smart payment gateway comparison platform that helps merchants find the best payment gateway for their business — based on rates, features, and real reviews. From discovery to onboarding, Comparex manages the entire journey through a structured multi-role ecosystem.

---

## 🌟 What is Comparex?

Finding the right payment gateway is overwhelming. Dozens of options, hidden fees, unclear activation timelines — merchants waste hours researching.

**Comparex fixes this.**

Merchants visit the platform, compare all major payment gateways side by side, submit an onboarding request, and get connected with the right provider — all in one place. Resellers earn commission by referring merchants. Admins manage the entire pipeline from lead to activation.

---

## ✨ Core Features

### 🏪 For Merchants
- Compare payment gateways by MDR rates, TAT, features, and ratings
- Submit onboarding leads without creating an account
- Book expert consultation calls via Calendly
- Track application status in real time
- Submit reviews and ratings for payment gateways

### 🤝 For Resellers
- Generate unique referral links
- Track referred merchants and their GMV
- View earned commissions in real time
- Manage KYC and invoice submissions for payouts

### ⚙️ For Admins
- Full lead lifecycle management — from submission to activation
- Assign leads to the right payment gateway partners
- Configure MDR rates and commission slabs
- Approve payouts with complete audit trail
- Analytics across GMV, leads, resellers, and conversions

---

## 🏗️ System Architecture  

Merchant / Reseller / Admin
↓
Express.js REST API
↓
JWT Auth + RBAC Middleware
↓
Business Logic (Services)
↓
MongoDB via Mongoose
↓
Third-party Integrations
(Calendly · SendGrid · KYC)


---

## 👥 User Roles

| Role | Responsibility |
|------|---------------|
| 🔴 MASTER_ADMIN | Full platform control — users, payouts, analytics, settings |
| 🟠 SUB_ADMIN | Lead qualification and assignment to payment gateways |
| 🟡 PG_ADMIN | Manage PG profile, handle assigned leads, update status |
| 🟢 RESELLER | Refer merchants, track GMV and commissions |
| 🔵 MERCHANT | Compare PGs, submit leads, book expert calls |

---

## 🔐 Security

- JWT-based stateless authentication
- bcrypt password hashing
- Permission-based RBAC with centralized mapping
- Rate limiting on all public APIs
- Helmet.js for secure HTTP headers
- Input validation via Zod schemas

---

## 🛣️ API Overview

### Auth
```http
POST   /api/auth/signup
POST   /api/auth/signin
```

### Payment Gateways
```http
GET    /api/pg              # Compare all PGs (public)
GET    /api/pg/:id          # PG details (public)
POST   /api/pg              # Create PG
PATCH  /api/pg/:id          # Update PG
DELETE /api/pg/:id          # Delete PG
```

### Leads *(coming soon)*
```http
POST   /api/leads/submit
PATCH  /api/leads/:id/qualify
PATCH  /api/leads/:id/assign
PATCH  /api/leads/:id/status
```

### Reseller *(coming soon)*
```http
GET    /api/reseller/my-link
GET    /api/reseller/my-leads
GET    /api/reseller/my-commission
POST   /api/reseller/kyc
```

---

## ⚡ Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Language | TypeScript |
| Database | MongoDB |
| ODM | Mongoose |
| Auth | JSON Web Tokens |
| Password Hashing | bcryptjs |
| Validation | Zod |
| Security | Helmet · CORS · Rate Limiting |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Installation

```bash
git clone https://github.com/kartikSingh28/comparex-Backend.git
cd comparex-backend
npm install
```

### Environment Setup

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/comparex_db
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### Run

```bash
npm run dev
```

---

## 📄 License

MIT

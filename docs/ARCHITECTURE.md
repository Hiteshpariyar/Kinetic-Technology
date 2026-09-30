# Kinetic Technology Platform Architecture

## System Architecture Overview

The platform is designed with a modern decoupled monorepo architecture:

```
├── client/          # React + Vite + TypeScript + Tailwind CSS Frontend
├── server/          # Node.js + Express + TypeScript Backend
├── shared/          # Shared TypeScript models, contracts, and Zod validators
├── prisma/          # Prisma database schema and migrations
├── docs/            # Architecture and developer documentation
└── scripts/         # Dev runner and orchestration utilities
```

---

## 1. Frontend (`/client`)
- **Framework**: React 18 with TypeScript and Vite
- **Styling**: Tailwind CSS with CSS design tokens & dark/light theme support
- **Routing**: React Router DOM (supports public pages, client portal, admin dashboard)
- **Centralized Brand Config**: `src/config/companyConfig.ts` controls brand name, logos, contacts, colors, and defaults without hardcoding.

---

## 2. Backend (`/server`)
- **Framework**: Express.js with TypeScript
- **Security**:
  - `helmet` for secure HTTP headers
  - `cors` with restricted origin whitelist
  - `cookie-parser` for secure HTTP-only cookies
  - `express-rate-limit` for DDoS / brute-force mitigation
  - `bcrypt` for secure salted password hashing
  - `jsonwebtoken` for signed session tokens
- **Architecture**:
  - `controllers/`: Request handling and response coordination
  - `routes/`: Express modular route definitions (`/api/auth`, `/api/leads`, `/api/estimate`, `/api/health`)
  - `services/`: Business logic (dynamic pricing engine, timeline estimation service)
  - `middleware/`: Authentication (`requireAuth`, `requireRole`), error handling, request logging

---

## 3. Database & ORM (`/prisma`)
- **ORM**: Prisma Client v5
- **Database**: PostgreSQL (configurable via `DATABASE_URL`)
- **Entities**:
  - `User`: System accounts with role association
  - `Role`: Role definitions (Client, Admin, Super Admin, PM, Developer)
  - `Permission`: Fine-grained permission mappings
  - `PricingRule`: Data-driven dynamic pricing matrix
  - `Lead`: Contact and quote inquiries
  - `Estimate`: Dynamic project estimates and configurator specifications

---

## 4. Shared Layer (`/shared`)
- **Domain Models**: Types for Users, Roles, Estimates, Pricing Breakdowns, and Timeline Estimates
- **Validators**: Zod schemas for runtime payload validation (`registerSchema`, `loginSchema`, `leadSchema`, `estimateCalculationSchema`)

---

## 5. Available Scripts

From the repository root:
- `npm run dev`: Concurrently boots both the backend API and frontend Vite servers
- `npm run build`: Type-checks and compiles both backend TypeScript and frontend Vite assets
- `npm run lint`: Executes ESLint across all TypeScript source files
- `npm run prisma:generate`: Generates typed Prisma Client

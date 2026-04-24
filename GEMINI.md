# Prosperity - Personal Finance Tracker

Prosperity is a modern, monorepo-based personal finance tracker designed to help users track their spending, set budgets, and manage saving goals.

## Architecture

The project is structured as a **Turborepo** monorepo using **pnpm** workspaces.

### Applications

- **`apps/api` (Backend):**
  - Built with **NestJS**.
  - **GraphQL** API using Apollo Driver (Code-first approach).
  - **Drizzle ORM** for database interactions with PostgreSQL.
  - **Better-Auth** for authentication, integrated via `@thallesp/nestjs-better-auth`.
  - **Teller API** integration for bank connectivity (located in `src/lib/bankClient/teller`).
  - Modules: `bank`, `budget`, `category`, `savingGoal`, `transaction`.

- **`apps/web` (Frontend):**
  - Built with **Next.js** (App Router).
  - Styled with **Tailwind CSS** (v4) and **Radix UI** primitives.
  - Uses **Apollo Client** and **GraphQL Request** for data fetching.
  - Integrates **Better-Auth** client-side with Passkey and 2FA support.
  - Employs **Next.js Server Actions** to bridge the frontend and GraphQL API.
  - **Zustand** for client-side state management.
  - **Zod** for schema validation.
  - **Sonner** for toast notifications and **Next-themes** for theme management.
  - Visualizations using **Recharts**.

### Shared Packages

- **`packages/config/tailwindcss`**: Shared Tailwind CSS configuration.
- **`packages/types`**: Shared TypeScript types and GraphQL codegen output.

## Tech Stack

| Component           | Technology                                |
| :------------------ | :---------------------------------------- |
| Monorepo Management | Turborepo, pnpm                           |
| Language            | TypeScript                                |
| Backend Framework   | NestJS                                    |
| API Layer           | GraphQL (Apollo)                          |
| Database ORM        | Drizzle ORM                               |
| Database            | PostgreSQL                                |
| Authentication      | Better-Auth                               |
| Frontend Framework  | Next.js (App Router)                      |
| Styling             | Tailwind CSS, Lucide React                |
| UI Components       | Radix UI, Sonner                          |
| State Management    | Zustand                                   |
| Validation          | Zod                                       |
| Bank Connectivity   | Teller API                                |

## Key Workflows

### Development

- **Start all apps:** `pnpm dev` (Starts API on default and Web on port 7702)
- **Database Migrations:** `pnpm db:migrate`
- **Docker Setup:** `pnpm docker:up` (Starts development database)

### API Specifics

- **Auth Schema Generation:** `pnpm auth:generate` (in `apps/api`)
- **DB Migration Generation:** `pnpm db:generate` (in `apps/api`)
- **GraphQL Schema:** Automatically generated at `apps/api/src/lib/graphql/schema/schema.gql`.

### Web Specifics

- **GraphQL Codegen:** `pnpm gql:generate` (in `apps/web`)

## Coding Standards & Conventions

- **GraphQL:** Use code-first decorators in NestJS. Server actions in Next.js should handle API interactions.
- **Authentication:** Always use the session context from `Better-Auth` to authorize requests. Use `'use client'` components when using auth hooks in the frontend.
- **Database:** Define schemas in `apps/api/src/lib/db/schema/` and use Drizzle's relational queries where appropriate.
- **Frontend Features:** Organise components within `apps/web/src/features/`. Use the `shared` feature for cross-cutting components and UI primitives.
- **Styling:** Use Tailwind CSS for component styling. Follow the existing Shadcn-like component structure in `apps/web/src/components/ui`.
- **Formatting:** Prettier and ESLint are configured across the workspace.

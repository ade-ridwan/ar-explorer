# Conclusion Project Explorer - README

## Project Overview
This project is a monorepo application using **Bun**, **Elysia.js**, and **Vue 3**. It serves as a file explorer application.

## Tech Stack
- **Monorepo Manager**: [pnpm](https://pnpm.io/) workspaces
- **Backend**:
  - Runtime: [Bun](https://bun.sh/)
  - Framework: [Elysia.js](https://elysiajs.com/)
  - Database ORM: [Drizzle ORM](https://orm.drizzle.team/)
  - Database: PostgreSQL
- **Frontend**:
  - Framework: [Vue 3](https://vuejs.org/)
  - Build Tool: [Vite](https://vitejs.dev/)
  - Styling: [TailwindCSS](https://tailwindcss.com/)

## Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (for pnpm)
- [Bun](https://bun.sh/) (for backend runtime)
- [pnpm](https://pnpm.io/) (package manager)
- [PostgreSQL](https://www.postgresql.org/) (database)

## Getting Started

### 1. Installation
Clone the repository and install dependencies using pnpm:

```bash
pnpm install
```

### 2. Environment Configuration
Navigate to the `backend` directory and set up your environment variables. You can check the `.env.example` if available, or create a `.env` file with the following:

```env
# backend/.env
DATABASE_URL=postgres://user:password@localhost:5432/your_database_name
PORT=3000
NODE_ENV=development
```
*Note: Ensure your PostgreSQL database is running and accessible.*

### 3. Database Setup
Run the following commands to initialize your database schema and seed data:

```bash
# Generate schema migrations
pnpm db:generate

# Push schema to the database
pnpm db:push

# Seed the database with initial data
pnpm db:seed
```

### 4. Running the Application
To start both the backend and frontend in development mode:

```bash
pnpm dev
```
- **Frontend**: http://localhost:5173 (or as indicated in terminal)
- **Backend**: http://localhost:3000

## Build & Production
To build the application for production:

```bash
pnpm build
```

To start the production server:
```bash
pnpm start
```

## Project Structure
- `backend/`: Server-side code (Elysia.js, Drizzle)
- `frontend/`: Client-side code (Vue 3, Vite)

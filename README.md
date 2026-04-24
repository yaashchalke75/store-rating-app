# StoreRatePro

A full-stack **Store Rating Web Application** where users rate stores (1 to 5). Built with three roles: System Administrator, Normal User, and Store Owner.

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Axios
- **Backend:** Node.js, Express, Prisma, JWT, bcrypt
- **Database:** PostgreSQL

## Prerequisites

- Node.js v18+
- PostgreSQL v14+
- Git

## Setup

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd StoreRatePro
```

### 2. Create the database

Open **pgAdmin**, connect to your server, then right-click **Databases → Create → Database**:
- **Name:** `storeratepro`
- **Owner:** `postgres`

### 3. Backend

```bash
cd server
npm install
```

Create a file named `.env` inside `server/` with this content:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/storeratepro?schema=public"
JWT_SECRET="any-long-random-string"
JWT_EXPIRES_IN="7d"
PORT=5000
CLIENT_ORIGIN="http://localhost:5173"
```

Replace `YOUR_PASSWORD` with your PostgreSQL password.

Then run:

```bash
npx prisma migrate dev --name init
npm run seed
npm run dev
```

Backend starts at **http://localhost:5000**.

### 4. Frontend

Open a **new terminal**:

```bash
cd client
npm install
```

Create a file named `.env` inside `client/` with:

```env
VITE_API_URL=http://localhost:5000/api
```

Then run:

```bash
npm run dev
```

Frontend starts at **http://localhost:5173**.

## Default Admin Login

- **Email:** `admin@storerate.pro`
- **Password:** `Admin@123`

Login as admin, create owner users + stores, then sign up as a normal user to rate them.

## Ports

| Service | Port |
|---|---|
| Frontend | 5173 |
| Backend | 5000 |
| PostgreSQL | 5432 |

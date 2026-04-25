# StoreRatePro

A full-stack **Store Rating Web Application** where users rate stores (1 to 5). Built with three roles: System Administrator, Normal User, and Store Owner.

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Axios, React Icons
- **Backend:** Node.js, Express, Prisma, JWT, bcrypt
- **Database:** PostgreSQL

## Roles & Capabilities

### System Administrator
- View dashboard with totals: users, stores, ratings
- View, search, sort, filter, and paginate all users
- View detailed user profile (including a store owner's average rating)
- Create new users with any role (Admin / Owner / Normal User)
- View, search, sort, and paginate all stores
- Create new stores and assign them to any owner
- Change own password
- Switch between light and dark theme

### Store Owner
- View dashboard with the store's average rating and total ratings
- See the list of users who rated their store (name, email, rating, date)
- Change own password
- Switch between light and dark theme

### Normal User
- Sign up for an account
- Browse all stores with search by name or address
- See each store's overall average rating
- Submit a 1-5 rating on any store
- Update an existing rating at any time
- Change own password
- Switch between light and dark theme

## Demo Credentials

After running the seed script (`npm run seed` from `server/`), these accounts are available:

| Role | Email | Password |
|---|---|---|
| Admin | `admin@storerate.pro` | `Admin@123` |
| Store Owner | `owner@storerate.pro` | `Owner@123` |
| Normal User | `user@storerate.pro` | `User@1234` |

The seed also creates one demo store assigned to the owner so the owner dashboard has data immediately.

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

## Ports

| Service | Port |
|---|---|
| Frontend | 5173 |
| Backend | 5000 |
| PostgreSQL | 5432 |

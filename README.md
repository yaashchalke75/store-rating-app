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

| Role        | Email                        | Password    |
| ----------- | ---------------------------- | ----------- |
| Admin       | `admin@storerate.com`        | `Admin@123` |
| Store Owner | `rajesh.owner@storerate.com` | `Pass@1234` |
| Normal User | `sneha.user@storerate.com`   | `Pass@1234` |

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

Create a new PostgreSQL database named `storeratepro` (owner: `postgres`). Use whichever tool you prefer:

- **Windows:** open **pgAdmin** → right-click **Databases → Create → Database**
- **Mac / Linux:** run `createdb storeratepro` in your terminal
- **Any OS:** run `psql -U postgres -c "CREATE DATABASE storeratepro;"`

### 3. Backend

```bash
cd server
npm install
```

Copy the example env file and fill in your details:

```bash
cp .env.example .env
```

Then open `server/.env` and replace `YOUR_PASSWORD` with your PostgreSQL password. The `JWT_SECRET` can be any long random string.

Run the database migration, seed the demo data, and start the server:

```bash
npx prisma migrate dev --name init
npm run seed
npm run dev
```

Backend starts at **http://localhost:5000**. You can verify it's running by opening **http://localhost:5000/api/health** in your browser — you should see `{"ok":true,...}`.

### 4. Frontend

Open a **new terminal**:

```bash
cd client
npm install
cp .env.example .env
```

The default `VITE_API_URL` in `.env.example` already points at the backend, so no edits are needed unless you changed the backend port.

Then run:

```bash
npm run dev
```

Frontend starts at **http://localhost:5173**. Open it in your browser and log in with any of the demo credentials above.

## Ports

| Service    | Port |
| ---------- | ---- |
| Frontend   | 5173 |
| Backend    | 5000 |
| PostgreSQL | 5432 |

# TaskSphere Backend

This is the backend for **TaskSphere**, a task management application similar to popular task apps.  
Built with **Node.js, Express, TypeScript, Prisma, and PostgreSQL**.

---

## Features

- User registration and login (JWT authentication)
- Password hashing with bcryptjs
- Role-based access (admin/user)
- Task management (CRUD)
- Task ownership checks
- TypeScript type safety
- PostgreSQL database integration with Prisma

---
## Setup & Run

1. Clone the repo:

```bash```
git clone <repo_url>
cd tasksphere-backend
Install dependencies:

npm install
Create .env file with:

ini
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/tasksphere_DB?schema=public"
JWT_SECRET="<your_jwt_secret>"
PORT=3000
Run Prisma migrations:
npx prisma migrate dev
Start the server:
npm run dev
Server should run at http://localhost:3000

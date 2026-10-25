# Project Submission & Review Dashboard

A modern web application for managing project submissions and reviews. Students can submit their projects with GitHub/live links and descriptions, while administrators can review submissions, provide feedback, assign grades, and view statistics.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) with [Base UI](https://base-ui.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query)
- **Forms**: [TanStack Form](https://tanstack.com/form)
- **Validation**: [Zod](https://zod.dev/)
- **HTTP Client**: [ofetch](https://github.com/unjs/ofetch)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linting/Formatting**: [Biome](https://biomejs.dev/)

## Features

### For Students

- User registration and authentication
- Submit projects with title, description, GitHub repository link, and live demo link
- View personal submission history and status
- Track review status (pending/approved/rejected) and feedback

### For Admins

- Dashboard with submission statistics
- View all student submissions with pagination
- Review submissions (approve/reject) with marks and feedback
- Access detailed submission information

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (dashboard)/       # Protected dashboard routes (admin/student)
│   ├── (public)/          # Public routes (auth, marketing)
│   └── layout.tsx         # Root layout
├── api/                   # API client functions
├── components/            # React components
│   ├── auth/             # Authentication guards and components
│   ├── dashboard/        # Dashboard layout components
│   ├── form/             # Form components
│   ├── layout/           # Layout components
│   ├── modules/          # Feature modules
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and API client setup
├── providers/            # Context providers
├── routes/               # Route configurations
├── types/                # TypeScript type definitions
└── validation/           # Zod validation schemas
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- [npm](https://www.npmjs.com/) or your preferred package manager
- Backend API server running (default: `http://localhost:5000/api/v1`)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd project-submission-and-review-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory (or update the existing one):

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Test Credentials

### Admin

- **Email**: `testeradmin@yahoo.com`
- **Password**: `TesterAdmin@123456`

### Student

- **Email**: `zilhaj@gmail.com`
- **Password**: `Sa@123456`

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Lint code with Biome
npm run format   # Format code with Biome
```

## API Integration

The app communicates with a REST API. API endpoints are defined in the `src/api/` directory:

- **Auth**: Login, register, logout, get current user
- **Submissions**: Submit project, view submissions (student/admin), review submissions, get statistics

## Deployment

This project can be deployed on [Vercel](https://vercel.com/) or any platform that supports Next.js. Make sure to set the `NEXT_PUBLIC_API_BASE_URL` environment variable to point to your production API.

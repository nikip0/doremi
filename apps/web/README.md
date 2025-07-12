# Doremi - Music Review Hub

A beautiful music review application built with Next.js, Prisma, and Tailwind CSS.

## Features

- 🎵 Discover trending albums
- ⭐ Rate and review albums and tracks
- 👥 Follow other music lovers
- 💿 Detailed album and track information
- 🎨 Beautiful, modern UI

## Deployment to Vercel

### Prerequisites

1. **PostgreSQL Database**: You'll need a PostgreSQL database. We recommend:
   - [Neon](https://neon.tech) (free tier available)
   - [Supabase](https://supabase.com) (free tier available)
   - [Railway](https://railway.app) (free tier available)

### Deployment Steps

1. **Fork/Clone this repository**

2. **Set up your database**:
   - Create a PostgreSQL database
   - Get your connection string

3. **Deploy to Vercel**:
   - Connect your GitHub repository to Vercel
   - Set the following environment variables in Vercel:
     - `DATABASE_URL`: Your PostgreSQL connection string

4. **Database Setup**:
   - After deployment, run the database migrations:
   ```bash
   npx prisma db push
   ```
   - Seed the database (optional):
   ```bash
   npm run db:seed
   ```

### Environment Variables

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string

### Local Development

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:3000`

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/
│   ├── api/          # API routes
│   ├── album/        # Album pages
│   ├── user/         # User profile pages
│   ├── trending/     # Trending albums page
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Home page
└── prisma/
    ├── schema.prisma # Database schema
    └── seed.js       # Database seeding
```

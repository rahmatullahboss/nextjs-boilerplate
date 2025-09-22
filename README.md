# Online Bazar - Next.js + Payload CMS + Postgres

This is a fullstack e-commerce application built with Next.js, Payload CMS v3, and Postgres. It follows the structure and data model of the Online-Bazar reference repository.

## Features

### Public Features (No Authentication Required)
- Browse Products: View available snacks with images, descriptions, prices, and categories
- Responsive Design: Fully responsive interface that works on desktop, tablet, and mobile devices

### Authenticated User Features
- User Registration & Login: Secure authentication system
- Place Orders: Add snacks to cart and place orders
- Order History: View personal order history with status tracking
- Cancel Pending Orders: Cancel orders while they are still pending

### Admin Features
- Admin Dashboard: Comprehensive order management
- Order Management: Update order status through the 6-status workflow
- Inventory Management: Manage snack inventory through Payload CMS admin panel
- Delivery Settings: Configure delivery charges and free-delivery thresholds

## Tech Stack
- Frontend: Next.js 15, React 19, TypeScript
- Backend: Payload CMS 3.0
- Database: Vercel Postgres
- Authentication: Built-in Payload authentication with role-based access
- Media: Sharp for image processing

## Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm 9+ or 10+
- PostgreSQL database (Vercel Postgres recommended)

### Local Development with Docker Postgres

1. Start the PostgreSQL database:
```bash
docker-compose up -d
```

2. Copy the environment file and configure it:
```bash
cp .env.example .env
```

3. Install dependencies:
```bash
npm install
```

4. Run database migrations:
```bash
npm run migrate
```

5. Seed the database with initial data:
```bash
npm run db:seed
```

6. Start the development server:
```bash
npm run dev
```

7. Open your browser and navigate to:
   - Public site: [http://localhost:3000](http://localhost:3000)
   - Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)
   - REST API: [http://localhost:3000/api/payload](http://localhost:3000/api/payload)
   - GraphQL API: [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql)

### First Time Setup
1. Visit [http://localhost:3000/admin](http://localhost:3000/admin) to log in with the admin user:
   - Email: admin@example.com
   - Password: Admin123! (change on first login)
2. View available snacks at [http://localhost:3000](http://localhost:3000)
3. Test ordering by creating a regular user account

## Deployment to Vercel

1. Connect your repository to Vercel
2. Configure Vercel Postgres database
3. Set the following environment variables in Vercel Project Settings:
   - `PAYLOAD_SECRET` - A random string for Payload CMS encryption
   - `POSTGRES_URL` - Your Vercel Postgres connection string
   - `NEXT_PUBLIC_SERVER_URL` - Your deployed URL (e.g., https://your-app.vercel.app)
4. Deploy the application

## Project Structure
```
├── app/                  # Next.js app router
│   ├── (payload)/        # Payload admin routes
│   ├── api/              # API routes
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── src/
│   ├── payload.config.ts # Payload configuration
│   ├── payload/
│   │   ├── collections/  # Payload collections (Users, Snacks, Orders, etc.)
│   │   └── globals/      # Payload globals (if any)
│   ├── migrations/       # Database migrations
│   └── seed/             # Data seeding scripts
├── scripts/              # Helper scripts
├── .env.example          # Environment variables template
├── docker-compose.yml    # Local PostgreSQL setup
├── next.config.ts        # Next.js configuration with Payload integration
└── vercel.json           # Vercel deployment configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run payload` - Run Payload CLI commands
- `npm run migrate` - Run database migrations
- `npm run migrate:create` - Create a new migration
- `npm run migrate:status` - Check migration status
- `npm run db:seed` - Seed the database with initial data

## Data Model

### Users
- Email, first name, last name
- Role-based authentication (user/admin)
- Default role: 'user'

### Snacks
- Name, description, price, category
- Image upload with media relation
- Availability toggle
- Categories: Chips, Candy, Cookies, Nuts, Crackers, Drinks

### Orders
- User relationship
- Array of items (snack + quantity)
- Total amount calculation
- Status tracking (pending/processing/shipped/completed/cancelled/refunded)

### Delivery Settings
- Single-record collection managed by admins
- Fields: inside/outside Dhaka delivery charges and the free-delivery threshold

### Media
- Image upload and management
- Alt text for accessibility

## Access Control

- Public: can read Snacks (only available=true)
- Authenticated user: can create Orders; can read their own Orders; can cancel when status=pending
- Admin: full access to Orders + Snacks + DeliverySettings; can update order status

## Common Commands

### Database Management
```bash
# Create a new migration
npm run migrate:create

# Check migration status
npm run migrate:status

# Run migrations
npm run migrate
```

### Data Seeding
```bash
# Seed the database
npm run db:seed
```

### Payload CMS
```bash
# Generate TypeScript types
npm run payload generate:types

# List all Payload commands
npm run payload
```
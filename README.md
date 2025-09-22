# Online Bazar - Next.js + Payload CMS + Postgres

This is a fullstack e-commerce application built with Next.js, Payload CMS v3, and Postgres. It follows the structure and data model of the Online-Bazar reference repository.

## Features

### Public Features (No Authentication Required)
- Browse Products: View available items with images, descriptions, prices, and categories
- Responsive Design: Fully responsive interface that works on desktop, tablet, and mobile devices

### Authenticated User Features
- User Registration & Login: Secure authentication system
- Place Orders: Add items to cart and place orders
- Order History: View personal order history with status tracking
- Cancel Pending Orders: Cancel orders while they are still pending

### Admin Features
- Admin Dashboard: Comprehensive order management
- Order Management: Update order status through the 6-status workflow
- Inventory Management: Manage item inventory through Payload CMS admin panel
- Delivery Settings: Configure delivery charges and free-delivery thresholds
- Category Management: Organize products into categories

## Tech Stack
- Frontend: Next.js 15, React 19, TypeScript
- Backend: Payload CMS 3.0
- Database: Vercel Postgres
- Authentication: Built-in Payload authentication with role-based access
- Media: Sharp for image processing
- UI Components: Radix UI, Tailwind CSS

## Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm 9+ or 10+
- PostgreSQL database (Vercel Postgres recommended)
- Docker (for local development)

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
2. View available items at [http://localhost:3000](http://localhost:3000)
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
│   │   ├── collections/  # Payload collections (Users, Items, Orders, etc.)
│   │   ├── access/       # Access control functions
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
- `npm run generate:types` - Generate TypeScript types from Payload config
- `npm run generate:importmap` - Generate import map for Payload

## Data Model

### Users
- Email, first name, last name
- Customer number and delivery zone
- Shipping address (line1, line2, city, state, postal code, country)
- Role-based authentication (user/admin)
- Default role: 'user'

### Items (Products)
- Name, short description, full description
- Price and availability toggle
- Image upload with media relation or external image URL
- Category relationship

### Categories
- Name and description
- Used to organize items

### Orders
- User relationship
- Customer details (name, email, phone number)
- Payment method (Cash on Delivery, bKash, Nagad)
- Payment details (sender number, transaction ID)
- Array of items (item + quantity)
- Status tracking (pending/processing/shipped/completed/cancelled/refunded)
- Financial details (subtotal, shipping charge, total amount)
- Delivery zone and free delivery status
- Shipping address
- Device type and user agent for analytics

### Delivery Settings
- Single-record collection managed by admins
- Label for identification
- Inside/outside Dhaka delivery charges
- Free delivery threshold
- Digital payment delivery charge
- Shipping highlight title and subtitle

### Media
- Image upload and management
- Alt text for accessibility

## Access Control

- Public: can read Items and Categories
- Authenticated user: can create Orders; can read their own Orders; can cancel when status=pending
- Admin: full access to all collections; can update order status

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
npm run generate:types

# Generate import map
npm run generate:importmap

# List all Payload commands
npm run payload
```

## Environment Variables

The following environment variables are required:

- `PAYLOAD_SECRET` - A random string for Payload CMS encryption
- `POSTGRES_URL` - Your Vercel Postgres connection string (for production)
- `DATABASE_URL` - Your local PostgreSQL connection string (for development)
- `NEXT_PUBLIC_SERVER_URL` - Your server URL

Optional variables for media storage:
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob storage token
- `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` - S3 storage credentials

Optional variables for email:
- `GMAIL_USER` - Gmail address for sending emails
- `GOOGLE_APP_PASSWORD` - App password for Gmail
- `EMAIL_DEFAULT_FROM_NAME` - Default sender name
- `ORDER_NOTIFICATIONS_EMAIL` - Email for order notifications

## Troubleshooting

### Database Connection Issues
- Ensure Docker is running and the PostgreSQL container is active
- Verify the DATABASE_URL in your .env file matches the docker-compose.yml configuration
- Check that the PostgreSQL port (5432) is not being used by another service

### Payload Admin Access
- If you can't log in to the admin panel, ensure you've run the seed script
- The default admin credentials are email: admin@example.com, password: Admin123!
- Remember to change the password on first login

### Migration Errors
- If migrations fail, check that your database connection is working
- You may need to reset your database with `docker-compose down -v` and start over

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and ensure no errors
5. Submit a pull request

## License

This project is licensed under the MIT License.
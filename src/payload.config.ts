import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import { Snacks } from './payload/collections/Snacks'
import { Orders } from './payload/collections/Orders'
import { DeliverySettings } from './payload/collections/DeliverySettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const getServerSideURL = () => {
  // Prefer explicitly provided public URL
  const explicit = process.env.NEXT_PUBLIC_SERVER_URL

  // In Vercel, VERCEL_URL is set per-deployment (includes preview domains)
  const vercelURL = process.env.VERCEL_URL
  const vercelProdURL = process.env.VERCEL_PROJECT_PRODUCTION_URL

  if (explicit) return explicit
  if (vercelURL) return `https://${vercelURL}`
  if (vercelProdURL) return `https://${vercelProdURL}`

  return 'http://localhost:3000'
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  serverURL: getServerSideURL(),
  // Allow current deployment URL, production domain, and localhost for dev
  cors: [getServerSideURL(), 'http://localhost:3000'].filter(
    Boolean,
  ) as string[],
  collections: [
    Users,
    Media,
    Snacks,
    Orders,
    DeliverySettings,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      // Prefer POSTGRES_URL, fallback to DATABASE_URL for hosts that provide that
      connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL || '',
    },
    // When set to undefined or true, Payload will automatically push DB
    // changes in dev environment.
    push:
      process.env.NODE_ENV === 'production'
        ? false
        : process.env.DISABLE_DB_PUSH === 'true'
          ? false
          : undefined,
  }),
  sharp,
})
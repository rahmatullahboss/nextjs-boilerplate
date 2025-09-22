import config from '../../../src/payload.config'
import { AdminView } from '@payloadcms/next/views'

export default async function AdminPage() {
  return <AdminView config={config} />
}
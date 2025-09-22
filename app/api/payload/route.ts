import config from '../../../src/payload.config'
import { RESTRoute } from '@payloadcms/next/routes'

export const { GET, POST, PATCH, DELETE, OPTIONS } = RESTRoute({
  config,
})
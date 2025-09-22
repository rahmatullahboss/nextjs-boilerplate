import config from '../../../src/payload.config'
import { GraphQLRoute } from '@payloadcms/next/routes'

export const { GET, POST } = GraphQLRoute({
  config,
})
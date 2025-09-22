import type { Access } from 'payload'

export const anyone: Access = () => true

export const admins: Access = ({ req: { user } }) => {
  return user?.role === 'admin'
}

export const adminsOnly: Access = ({ req: { user } }) => {
  return user?.role === 'admin' ? true : false
}

export const authenticated: Access = ({ req: { user } }) => {
  return Boolean(user)
}

export const adminsOrSelf: Access = ({ req: { user } }) => {
  if (user?.role === 'admin') return true
  return { id: { equals: user?.id } }
}

export const adminsOrOwner = (field: string): Access => {
  return ({ req: { user } }) => {
    if (user?.role === 'admin') return true
    if (user) return { [field]: { equals: user.id } }
    return false
  }
}

export const checkRole = (roles: string[], user: any) => {
  if (!user) return false
  if (roles.some((role) => user.role === role)) return true
  return false
}
import NextAuth from 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    /** raw Cognito ID token – use for Authorization header */
    id_token?: string
    access_token?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id_token?: string
    access_token?: string
    refresh_token?: string
    expires_at?: number
  }
}

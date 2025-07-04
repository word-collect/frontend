import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    /** raw Cognito ID token – use for Authorization header */
    id_token?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id_token?: string
  }
}

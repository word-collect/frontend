import NextAuth from 'next-auth'
import Cognito from 'next-auth/providers/cognito'

const base = {
  clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
  issuer: `https://cognito-idp.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}`,
  checks: ['pkce'] as ('pkce' | 'none' | 'state')[],
  client: { token_endpoint_auth_method: 'none' }, // public SPA
  /**
   * Tell Auth.js where the Cognito Hosted-UI logout endpoint is so it
   * can clear Cognito’s cookie as well as ours.
   */
  signOut: {
    url: `https://${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}/logout`,
    params: {
      client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
      logout_uri: `${process.env.NEXTAUTH_URL}/` // where Cognito should return
    }
  }
}

export const {
  handlers, // GET/POST route handlers
  signIn,
  signOut,
  auth // universal helper (server, RSC, middleware, edge, etc.)
} = NextAuth({
  debug: true,
  providers: [
    Cognito({
      id: 'cognito',
      ...base
    }),
    Cognito({
      id: 'cognito-signup',
      ...base,
      authorization: {
        url: `https://${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}/signup`,
        params: { scope: 'openid profile email' }
      }
    })
  ],
  session: { strategy: 'jwt' }, // same as before
  callbacks: {
    /**
     * 1. Persist Cognito’s ID token on every sign-in
     */
    async jwt({ token, account }) {
      if (account?.id_token) token.id_token = account.id_token
      return token
    },

    /**
     * 2. Expose it to the client‐side session object
     */
    async session({ session, token }) {
      session.id_token = token.id_token as string | undefined
      return session
    }
  }
})

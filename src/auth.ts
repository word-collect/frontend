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
      if (account) {
        token.id_token = account.id_token
        token.refresh_token = account.refresh_token // ⬅ NEW
        token.access_token = account.access_token // (optional)
        token.expires_at = account.expires_at // epoch seconds
      }

      /* ① refresh 5 min before expiry */
      const FIVE_MIN = 5 * 60
      if (Date.now() / 1000 > (token.expires_at ?? 0) - FIVE_MIN) {
        const res = await fetch(
          `https://${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}/oauth2/token`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              grant_type: 'refresh_token',
              client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
              refresh_token: token.refresh_token as string
            })
          }
        ).then((r) => r.json())

        token.id_token = res.id_token
        token.access_token = res.access_token
        token.expires_at = Date.now() / 1000 + res.expires_in
      }
      return token
    },

    /**
     * 2. Expose it to the client‐side session object
     */
    async session({ session, token }) {
      session.id_token = token.id_token as string
      session.access_token = token.access_token as string | undefined
      return session
    }
  }
})

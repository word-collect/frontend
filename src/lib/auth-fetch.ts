import { signOut, getSession } from 'next-auth/react' // client-side funcs
import { auth } from '@/auth' // server-side helper

/**
 * Unified helper: grabs the current ID token, adds Authorization header,
 * re-signs out on 401. Call it exactly like fetch().
 *
 *   const r = await authedFetch("/endpoint", { method: "POST", body: … });
 */
export async function authedFetch(
  input: RequestInfo | URL,
  init: RequestInit = {}
) {
  // --- 1. Get a fresh ID-token, client or server -------------------------
  let idToken: string | undefined

  if (isServer()) {
    const session = await auth() // server-side (may be null)
    idToken = session?.id_token
  } else {
    const session = await getSession() // client-side
    idToken = session?.id_token
  }

  if (!idToken) {
    // No token → treat as logged-out before calling the API
    if (!isServer()) await signOut({ redirect: true })
    throw new Error('Not authenticated')
  }

  // --- 2. Merge caller-supplied headers with ours ------------------------
  const headers = new Headers(init.headers)
  headers.set('Authorization', `Bearer ${idToken}`)

  // --- 3. Perform the request -------------------------------------------
  const res = await fetch(input, { ...init, headers })

  if (res.status === 401 && !isServer()) {
    await signOut({ redirect: true }) // clears cookies & Cognito SSO
    // prevent caller code from processing a 401 body
    return new Promise<never>(() => {})
  }

  return res
}

/* helper */
function isServer() {
  return typeof window === 'undefined'
}

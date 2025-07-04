/* =========  2-A  endpoint resolution  =========== */

import { getSession } from 'next-auth/react'

// easiest when you used NEXT_PUBLIC_COLLECTION_API
const base = process.env.NEXT_PUBLIC_COLLECTION_API!

/*    — or — (if you chose 1-B)    */
// import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
// const ssm = new SSMClient({});
// const base =
//   (await ssm.send(new GetParameterCommand({
//     Name: "/wordcollect/prod/collection-service/api-endpoint",
//   }))).Parameter!.Value!;

/* =========  2-B  CRUD helpers  =========== */

export async function listWords() {
  const session = await getSession()
  return fetch(base, {
    headers: { Authorization: `Bearer ${session!.id_token}` }
  }).then((r) => r.json())
}

export async function createWord(word: string, notes = '') {
  const session = await getSession()
  await fetch(base, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session!.id_token}`
    },
    body: JSON.stringify({ word, notes })
  })
}

export async function updateWord(word: string, notes = '') {
  const session = await getSession()
  await fetch(base, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session!.id_token}`
    },
    body: JSON.stringify({ word, notes })
  })
}

export async function deleteWord(word: string) {
  const session = await getSession()
  await fetch(base, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session!.id_token}`
    },
    body: JSON.stringify({ word })
  })
}

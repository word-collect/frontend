import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm'

const ssm = new SSMClient({ region: process.env.AWS_REGION || 'us-east-1' })

/**
 * Reads the WebSocket endpoint from SSM and caches it per Lambda/Edge runtime.
 */
let cached: string | undefined

export async function getWsEndpoint(): Promise<string> {
  if (cached) return cached
  const paramName = `/wordcollect/dev/notification-service/ws-endpoint` // ⇽ change env
  const { Parameter } = await ssm.send(
    new GetParameterCommand({ Name: paramName })
  )
  if (!Parameter?.Value) throw new Error(`Param ${paramName} not found`)
  cached = Parameter.Value
  return cached
}

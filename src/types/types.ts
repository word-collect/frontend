export type ServerEvent = {
  eventType: string
  s3Key: string
  userSub: string
  classification?: string
  result?: string
  failed?: string[]
  saved?: number
}

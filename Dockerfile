# ── Dockerfile (at repo root) ──
# 1️⃣ build the app
FROM node:20-bullseye as builder
WORKDIR /app

# receive the args from CDK
ARG NEXT_PUBLIC_COGNITO_CLIENT_ID
ARG NEXT_PUBLIC_COGNITO_USER_POOL_ID
ARG NEXT_PUBLIC_AWS_REGION
ARG NEXT_PUBLIC_COGNITO_DOMAIN
ARG NEXTAUTH_URL

# make them visible to `next build`
ENV \
  NEXT_PUBLIC_COGNITO_CLIENT_ID=$NEXT_PUBLIC_COGNITO_CLIENT_ID \
  NEXT_PUBLIC_COGNITO_USER_POOL_ID=$NEXT_PUBLIC_COGNITO_USER_POOL_ID \
  NEXT_PUBLIC_AWS_REGION=$NEXT_PUBLIC_AWS_REGION \
  NEXT_PUBLIC_COGNITO_DOMAIN=$NEXT_PUBLIC_COGNITO_DOMAIN \
  NEXTAUTH_URL=$NEXTAUTH_URL

COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build && npm prune --production

# --- runtime stage ----------------------------------------------
FROM node:20-bullseye
WORKDIR /app
COPY --from=builder /app .
ENV PORT=3000 HOSTNAME=0.0.0.0 NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
# ── Dockerfile (at repo root) ──
# 1️⃣ build the app
FROM node:20-bullseye as builder
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build && npm prune --production

# 2️⃣ run it with tini for PID 1 signals
FROM node:20-bullseye
WORKDIR /app
COPY --from=builder /app .
ENV PORT=3000 HOSTNAME=0.0.0.0 NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
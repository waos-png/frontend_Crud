### Multi-stage Dockerfile for Next.js (app dir)
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --silent

# Copy sources and build
COPY . .
RUN npm run build

### Production image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only what we need from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Install production deps
RUN npm ci --production --silent

EXPOSE 3000

# Allow overriding the API URL at runtime
ENV NEXT_PUBLIC_API_URL="https://motivated-patience-production-2422.up.railway.app"

CMD ["npm", "run", "start"]

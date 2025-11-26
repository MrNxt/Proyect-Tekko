# Etapa 1: Build
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install && npm install sharp

COPY . .

RUN npm run build

# Etapa 2: Producción
FROM node:18-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Dependencias necesarias para sharp en Alpine
RUN apk add --no-cache libc6-compat python3 g++ make

# Copiamos archivos de la etapa builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/app ./app
COPY --from=builder /app/pages ./pages

# Instalamos sharp también en runner (asegura que funcione)
RUN npm install sharp

EXPOSE 3004
CMD ["npm", "start"]


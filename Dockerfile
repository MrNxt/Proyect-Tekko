# Etapa 1: Build (Node >= 22.23.4 patched for CVE-2026-111497)
FROM node:22.23.4 AS builder


WORKDIR /app

COPY package*.json ./
RUN npm install && npm install sharp

COPY . .

# --- Agregamos los build args para NEXT ---
ARG UPLOADTHING_TOKEN
ARG NEXT_PUBLIC_API_URL

# --- Exportamos como variables de entorno para que Next las consuma ---
ENV UPLOADTHING_TOKEN=${UPLOADTHING_TOKEN}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}


RUN npm run build

# Etapa 2: Producción (Node >= 22.23.4 patched for CVE-2026-111497)
FROM node:22.23.4-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Dependencias necesarias para sharp en Alpine
RUN apk add --no-cache libc6-compat python3 g++ make

# --- Aseguramos que el TOKEN llegue aquí también ---
ARG UPLOADTHING_TOKEN
ENV UPLOADTHING_TOKEN=${UPLOADTHING_TOKEN}

# Variables públicas también deben pasar a runtime
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}



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
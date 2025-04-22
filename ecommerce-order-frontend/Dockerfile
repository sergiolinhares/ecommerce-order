# use Node 22 em Alpine para imagem leve
FROM node:22-alpine

WORKDIR /app

# 1) Instala dependências
COPY package*.json ./
RUN npm ci

# 2) Copia todo o código
COPY . .

# 3) Força polling para Tailwind + React dentro de container
ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true
# (se você usa Next.js, troque START por DEV:)
ENV NEXT_PUBLIC_API_URL=http://host.docker.internal:8082

EXPOSE 3000

# 4) Comando de dev (CRA: start / Next.js: dev)
CMD ["npm", "start"]
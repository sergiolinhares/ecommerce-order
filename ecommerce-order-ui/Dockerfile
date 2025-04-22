FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true
ENV NEXT_PUBLIC_API_URL=http://host.docker.internal:8082

EXPOSE 3000

CMD ["npm", "start"]
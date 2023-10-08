FROM node:20-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY src src
COPY public public
RUN npm run build

ENV NODE_ENV production
EXPOSE 3000

CMD [ "npx", "serve", "build" ]

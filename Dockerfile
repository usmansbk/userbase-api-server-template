# syntax=docker/dockerfile:1
FROM node:16 as base 
ENV NODE_ENV=development
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .

FROM base as dev 
CMD yarn dev 

FROM base as builder
RUN yarn build

FROM node:16 as prod
ENV NODE_ENV=production
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY --from=builder /app/build ./build
COPY ./prisma ./prisma
COPY ./locales ./locales
COPY ./emails ./emails
COPY .env.vault ./
RUN yarn db:deploy
EXPOSE 4000
CMD yarn start
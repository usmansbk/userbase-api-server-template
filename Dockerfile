# syntax=docker/dockerfile:1
FROM node:18 as base 
ENV NODE_ENV=development
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .

FROM base as dev 
CMD yarn dev 

FROM base as builder
RUN yarn build

FROM node:18 as prod
ENV NODE_ENV=production
WORKDIR /app
RUN mkdir /app/certs
VOLUME /app/certs
COPY package.json yarn.lock ./
RUN yarn
COPY --from=builder /app/build ./build
COPY ./prisma ./prisma
COPY ./assets ./assets
COPY .env.vault ./
RUN echo 'dontenvMe'
RUN echo $DOTENV_ME
# RUN npx dotenv-vault pull production --dotenvMe=$DOTENV_ME
# RUN mv .env.production .env
RUN yarn db:deploy
EXPOSE 4000
CMD yarn start
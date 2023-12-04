# Userbase

User management system api server base template

## Features

- [ ] User Profile
- [ ] RBAC
- [ ] Email authentication
- [ ] Social authentication
- [ ] SMS OTP authentication
- [ ] Email OTP authentication
- [ ] MFA
- [ ] In-app notifications
- [ ] Email notifications
- [ ] SMS notifications
- [ ] File uploads

## Prerequisites

- [Docker](https://www.docker.com/)

## Getting Started

### Environment Variables

**Existing project**

```sh
npx dotenv-vault pull
```

**New project**

```sh
cp .env.example .env
```

#### AWS

- Set your `AWS_REGIONS`, `AWS_ACCESS_KEY_ID`, and `AWS_SECRET_ACCESS_KEY` variables.
- Create an [S3 bucket](https://aws.amazon.com/s3/) to store documents (images, files, etc) and set your `AWS_S3_BUCKET` env variable.
- Follow [AWS Serverless Image Handler](https://aws.amazon.com/solutions/implementations/serverless-image-handler/) instructions to create a CDN and set your `CLOUDFRONT_API_ENDPOINT` env variable.
- Create a [Dynamodb table](https://aws.amazon.com/dynamodb/) table for in-app notifications and set your `AWS_DYNAMODB_DELTA_TABLE`.

#### Sentry

#### Twilio

#### Google Authentication

### Build Containers

```sh
yarn docker:build
```

### Run Containers

```sh
yarn docker:start
```

### Stop Containers

```sh
yarn docker:stop
```

## Database Migrations

```sh
yarn docker:sh
yarn db:migrate
```

## Development

### Clients

- [Admin Dashboard](http://localhost:3000/)
- [Apollo Studio](http://localhost:4000/graphql)
- [Prisma Studio](http://localhost:5555/)

### Main technologies

- [ExpressJS](https://expressjs.com/)
- [Apollo GraphQL](https://www.apollographql.com/docs/apollo-server/)
- [PrismaORM](https://www.prisma.io/docs/getting-started/quickstart)
- [Dotenv Vault](https://www.dotenv.org/docs/security/vault)

### GraphQL

- [Watch how Prisma handles N+1 Problem](https://www.prisma.io/docs/guides/performance-and-optimization/query-optimization-performance)
- [Scalar Types](https://the-guild.dev/graphql/scalars/docs)
- [Input validation](https://github.com/confuser/graphql-constraint-directive)

Run codegen after modifying the graphql schema to generate TypeScript definitions

```sh
yarn codegen
```

## Deployment

### Secrets

#### [Dotenv Vault](https://www.dotenv.org/docs/quickstart#sync)

[![dotenv-vault](https://badge.dotenv.org/fork.svg?r=1)](https://vault.dotenv.org/project/vlt_d58b61c8b19f6c19c95442b7f144d743c582effc071b5847060fb5b39f6c42c0/example)

Begin by creating your project's env vault and authenticating against it.

```sh
npx dotenv-vault new
npx dotenv-vault login
```

Push development `.env`` file securely

```sh
npx dotenv-vault push
```

Open the production environment to edit the production variables

```sh
npx dotenv-vault open production
```

Build your project's encrypted `.env.vault` file

```sh
npx dotenv-vault build
```

Fetch your production decryption key (will be used in the next step)

```sh
npx dotenv-vault keys production
```

### CI/CD

#### [DockerHub](https://hub.docker.com/)

- Generate and copy an access token for your [DockerHub account](https://hub.docker.com/settings/security)

- Add the access token to your repo actions secrets as `DOCKER_HUB_ACCESS_TOKEN`

- Add your dockerhub username to your repo actions secrets as `DOCKER_HUB_USERNAME`

- Add your dotenv-vault decryption key to your repo actions secrets as `DOTENV_KEY`

#### [Render](https://dashboard.render.com/)

##### Database

- Create a new [PostgreSQL database](https://dashboard.render.com/new/database)

- Add the External Database URL to your repo actions secrets as `DATABASE_URL`

- Add the Internal Database URL to your vault's production enviroment as `DATABASE_URL`

##### Cache

- Create a new [Redis Cache](https://dashboard.render.com/new/redis)

- Add the Internal Redis URL to your vault's prodction environment as `REDIS_URL`

#### Deploy

- Build your project's encrypted `.env.vault` file

```sh
npx dotenv-vault build
```

- Commit and push changes to trigger action

- Wait for CI build to finish successfully

- Create a new [Web Service](https://dashboard.render.com/create?type=web) using the new image from dockerhub. (you may need to add your DockerHub access token to render for private images)

- Click the Advanced button and add your `DOTENV_KEY` environment variable

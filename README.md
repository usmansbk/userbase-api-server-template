# Userbase API Server

User management system api server

## Features

- User management
- RBAC
- Email authentication
- Social authentication
- Email notification
- SMS notification

## Prerequisites

- [Docker](https://www.docker.com/)

## Getting Started

### Environment Variables

`.env` file is managed with [`dotenv-vault`](https://github.com/dotenv-org/dotenv-vault)

### AWS

- Create an S3 bucket to store documents (images, files, etc)
- Set up [AWS Serverless Image Handler]() to serve as CDN for images

### Twilio

### Google Authentication

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
yarn docker:sh
```

## Database Migrations

```sh
yarn docker:sh
```

Run dev migrations

```sh
yarn db:migrate
```

## Development

### Clients

- [Apollo Studio](http://localhost:4000/graphql)
- [Prisma Studio](http://localhost:5555/)

### Main technologies

- [ExpressJS](https://expressjs.com/)
- [Apollo GraphQL](https://www.apollographql.com/docs/apollo-server/)
- [PrismaORM](https://www.prisma.io/docs/getting-started/quickstart)

### GraphQL

- [Watch how Prisma handles N+1 Problem](https://www.prisma.io/docs/guides/performance-and-optimization/query-optimization-performance)
- [Scalar Types](https://the-guild.dev/graphql/scalars/docs)

Run codegen after modifying the graphql schema to generate TypeScript definitions

```sh
yarn codegen
```

### CI/CD

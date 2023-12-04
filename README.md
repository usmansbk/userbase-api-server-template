# Userbase API Server

User management system api server

## Features

- [ ] User Profile
- [ ] RBAC
- [ ] Email authentication
- [ ] Social authentication
- [ ] In-app notifications
- [ ] Email notifications
- [ ] SMS notifications
- [ ] File uploads

## Prerequisites

- [Docker](https://www.docker.com/)

## Getting Started

### Environment Variables

```sh
mv .env.example .env
```

### AWS

- Create an [S3 bucket](https://aws.amazon.com/s3/) to store documents (images, files, etc) and set your `AWS_S3_BUCKET` env variable.
- Set up [AWS Serverless Image Handler](https://aws.amazon.com/solutions/implementations/serverless-image-handler/) and set your `CLOUDFRONT_ENDPOINT` env variable.

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
- [Input validation](https://github.com/confuser/graphql-constraint-directive)

Run codegen after modifying the graphql schema to generate TypeScript definitions

```sh
yarn codegen
```

### CI/CD

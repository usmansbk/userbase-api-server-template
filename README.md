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

```sh
mv .env.example .env
```

### AWS

- Set your `AWS_REGIONS`, `AWS_ACCESS_KEY_ID`, and `AWS_SECRET_ACCESS_KEY` variables.
- Create an [S3 bucket](https://aws.amazon.com/s3/) to store documents (images, files, etc) and set your `AWS_S3_BUCKET` env variable.
- Follow [AWS Serverless Image Handler](https://aws.amazon.com/solutions/implementations/serverless-image-handler/) instructions to create a CDN and set your `CLOUDFRONT_API_ENDPOINT` env variable.

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

- [Admin Dashboard](http://localhost:3000/)
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

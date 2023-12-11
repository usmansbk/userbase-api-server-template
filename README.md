# Userbase

[![dotenv-vault](https://badge.dotenv.org/works-with.svg?r=1)](https://www.dotenv.org/r/github.com/dotenv-org/dotenv-vault?r=1)

User management system api server base template

## Features

- [x] Join/Leave waiting list
- [x] Login with identity provider (Google)
- [x] Refresh token rotation
- [x] Role Based Access Control
- [x] Register with email and Password
- [x] Login with email
- [x] Verify email address
- [x] Verify phone number
- [x] Login with verified phone number SMS OTP
- [x] Login with verified email OTP
- [x] Reset password
- [x] Logout from all devices
- [x] Delete user account
- [x] Update user profile
- [x] User profile picture
- [x] Brute-Force login protection
- [ ] 2FA with Authenticator apps (Possesion Factor)
- [ ] Admin Dashboard

## Prerequisites

- [Docker](https://www.docker.com/)

## Getting Started

### Environment Variables

- **Existing project**

```sh
npx dotenv-vault login
npx dotenv-vault pull
```

- **New project**

```sh
cp .env.example .env
```

### 3rd-Party Services

#### [AWS](https://aws.amazon.com/console/)

- Set your `AWS_REGION`, `AWS_ACCESS_KEY_ID`, and `AWS_SECRET_ACCESS_KEY` variables.
- Create an [S3 bucket](https://aws.amazon.com/s3/) to store documents (images, files, etc) and set your `AWS_S3_BUCKET` env variable.
- Follow [AWS Serverless Image Handler](https://aws.amazon.com/solutions/implementations/serverless-image-handler/) instructions to create a CDN and set your `CLOUDFRONT_API_ENDPOINT` env variable.
- Create a [Dynamodb table](https://aws.amazon.com/dynamodb/) for in-app notifications and set your `AWS_DYNAMODB_DELTA_TABLE`.
- Setup [SES](https://aws.amazon.com/ses/) for Email (Ensure you have this [AWS IAM Policy](https://nodemailer.com/transports/ses/#example-3)) and add your `SENDER_EMAIL` to the env variables.
- Setup [SNS](https://aws.amazon.com/sns/) for SMS.

#### [Sentry](https://sentry.io/)

- Create a sentry project and add the `SENTRY_DSN` to your environment file

#### Google Authentication

- Create a [Firebase project](https://console.firebase.google.com/) if you don't have one.

- Navigate to **APIs & Auth > Credentials** in the [Google Developers Console](https://console.cloud.google.com/) to get your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` environment variables

- Generate an _OAuth2 API v2_ id token from [Google 0Auth 2.0 Playground](https://developers.google.com/oauthplayground/) to test.

### Build

```sh
yarn docker:build
```

### Run

```sh
yarn docker:start
```

### Stop

```sh
yarn docker:stop
```

### Test

```sh
yarn test
```

## Database Migrations

```sh
yarn sh
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
- [Dotenv Vault](https://www.dotenv.org/docs/security/vault)
- [Email Templates](https://github.com/forwardemail/email-templates)

### GraphQL

- [Watch how Prisma handles N+1 Problem](https://www.prisma.io/docs/guides/performance-and-optimization/query-optimization-performance)
- [Scalar Types](https://the-guild.dev/graphql/scalars/docs)

Run codegen after modifying the graphql schema to generate TypeScript definitions

```sh
yarn codegen
```

### File Upload

We store information about uploaded files in the `File` table within the database. To ensure the deletion of S3 objects when an associated file row is removed, it is crucial to use the Prisma `delete` method. This is because our Prisma client is hooked to delete any associated file objects in S3.

Example:

```js
// DONT: This will not delete the picture in s3
prisma.update({
  where: {},
  data: {
    picture: {
      delete: true,
    },
  },
});

// DO: this will delete the file row and corresponding object in s3
await prisma.file.delete({
  where: {
    key: "...",
    bucket: "...",
  },
});
```

### Error Handling

We use ["wrapping exceptions"](https://javascript.info/custom-errors#wrapping-exceptions) technique to handle client generated errors. This allows us to take full control of the kind of errors we return, and easily translate them before sending to the end-users.

## Deployment

### Secrets

#### [Dotenv Vault](https://www.dotenv.org/docs/quickstart#sync)

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

##### Deploy

- Build your project's encrypted `.env.vault` file

```sh
npx dotenv-vault build
```

- Commit and push changes to trigger action

- Wait for CI build to finish successfully

- Create a new [Web Service](https://dashboard.render.com/create?type=web) using the new image from dockerhub. (You may need to add your DockerHub access token to render for private images)

- Click the Advanced button and add your `DOTENV_KEY` environment variable

## VSCode Extensions

- [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
- [Dotenv](https://marketplace.visualstudio.com/items?itemName=dotenv.dotenv-vscode)
- [GraphQL Foundation](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Readings

- [GraphQL Schema Design: Building Evolvable Schemas](https://www.apollographql.com/blog/backend/schema-design/graphql-building-evolvable-schemas/)

- [Apollo Server File Upload Best Practices](https://www.apollographql.com/blog/backend/file-uploads/file-upload-best-practices/)

- [Designing a GraphQL server for optimal performance](https://blog.logrocket.com/designing-graphql-server-optimal-performance/)

- [GraphQL Cursors Connections Specification](https://relay.dev/graphql/connections.htm)

- [TDD, Where Did It All Go Wrong - Ian Cooper](https://www.youtube.com/watch?v=EZ05e7EMOLM&list=TLPQMjIwMTIwMjJnzh0h4NGjEg&index=2)

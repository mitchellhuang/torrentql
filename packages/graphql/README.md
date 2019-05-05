# graphql

A GraphQL API server for TorrentQL. This repo follows the [Twelve-Factor App](https://12factor.net/) guidelines.

## Requirements

1. Node.js >= 10.15.0
2. Yarn >= 1.13.0
3. PostgreSQL >= 10.5

## Environment variables

Create a `.env` file from `.env.example` to load environment variables from a file.

```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
JWT_SECRET=
```

## Installation

1. `yarn install`
2. `npx knex migrate:latest`
3. `npx knex seed:run`
4. `create a .env file based on .env.example`
5. `cd deploy/deluge && docker-compose up -d`
6. `yarn run dev`

## Production build

1. `yarn start`

## Docker production build

1. `docker build -t graphql .`
2. `docker run -p 3001:3001 graphql`

## Authentication

Authentication against the GraphQL API is done with the `login(email: String, password: String)` mutation.
This mutation returns a `User` type with a JSON web token in the `token` field. Then, to make
authenticated requests, we add the JWT to our HTTP header in the format: `Authorization: Bearer <jwt>`.

## Style guidelines

1. 2 spaces indentation
2. Newline at the end of each file
3. Async await instead of promises
4. Trailing commas

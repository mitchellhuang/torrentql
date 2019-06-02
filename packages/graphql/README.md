# graphql

A GraphQL API server for TorrentQL. This repo follows the [Twelve-Factor App](https://12factor.net/) guidelines.

## Requirements

1. Node.js >= 10.15.0
2. Yarn >= 1.13.0
3. PostgreSQL >= 10.5

## Environment variables

Create a `.env` file from `.env.example` to load environment variables from a file.

```DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=torrentql
DB_PASSWORD=password
DB_DATABASE=torrentql
DB_SSL=false
JWT_SECRET=torrentql
```

## Installation

1. `yarn install`
2. `create a .env file based on .env.example`
3. `cd packages/deluge && docker-compose up -d`
4. `yarn build:watch`
5. `yarn run dev`

## Production build

1. `yarn build`
2. `yarn start`

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

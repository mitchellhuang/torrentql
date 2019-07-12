# @torrentql/billing

Billing daemon for TorrentQL.

## Requirements

1. Node.js >= 10
2. Yarn >= 1
3. PostgreSQL >= 10

## Environment variables

Create a `.env` file from `.env.example` to load environment variables from a file.

```
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=torrentql
DB_PASSWORD=password
DB_DATABASE=torrentql
DB_SSL=false
```

## Installation

1. `yarn install`
2. `create a .env file based on .env.example`
4. `yarn build:watch`
6. `yarn dev`

## Production build

1. `yarn build`
2. `yarn start`

## Docker production build

1. `docker build -t billing .`
2. `docker run -p 3001:3001 billing`

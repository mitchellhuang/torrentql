# @torrentql/nextjs

Next.js frontend for TorrentQL.

## Requirements

1. Node.js >= 10
2. Yarn >= 1

## Environment variables

Create a `.env` file from `.env.example` to load environment variables from a file.

```
API_URI=http://localhost:3001/graphql
FILES_PATH=http://localhost:3001/files
```

## Installation

1. `yarn install`
2. `create a .env file based on .env.example`
3. `yarn run dev`

## Production build

1. `yarn build`
2. `yarn start`

## Docker production build

1. `docker build -t nextjs .`
2. `docker run -p 3000:3000 nextjs`

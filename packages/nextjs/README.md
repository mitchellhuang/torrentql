# nextjs

A Next.js frontend for TorrentQL. This repo follows the [Twelve-Factor App](https://12factor.net/) guidelines.

## Requirements

1. Node.js >= 10.15.0
2. Yarn >= 1.13.0

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

## Style guidelines

1. 2 spaces indentation
2. Newline at the end of each file
3. Async await instead of promises
4. Trailing commas

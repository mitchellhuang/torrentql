FROM node:10-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY packages/common/package.json ./packages/common/
COPY packages/graphql/package.json ./packages/graphql/
RUN yarn
COPY ./ ./
RUN npx lerna run --scope @torrentql/common build
RUN npx lerna run --scope @torrentql/graphql build

WORKDIR packages/graphql

EXPOSE 3001
CMD ["yarn", "start"]

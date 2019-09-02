FROM node:10-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY packages/common/package.json ./packages/common/
COPY packages/billing/package.json ./packages/billing/
RUN yarn
COPY ./ ./
RUN npx lerna run --scope @torrentql/common build
RUN npx lerna run --scope @torrentql/billing build

WORKDIR packages/billing

CMD ["yarn", "start"]

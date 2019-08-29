FROM node:10-alpine

WORKDIR /usr/src/app

COPY ./ ./
RUN yarn
RUN npx lerna run --scope @torrentql/common build
RUN npx lerna run --scope @torrentql/billing build

WORKDIR packages/billing

CMD ["yarn", "start"]

FROM node:10-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY packages/nextjs/package.json ./packages/nextjs/
RUN yarn
COPY ./ ./
RUN npx lerna run --scope @torrentql/nextjs build

WORKDIR packages/nextjs

EXPOSE 3000
CMD ["yarn", "start"]

FROM node:10-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn --silent
COPY ./ ./

EXPOSE 3001
CMD ["yarn", "start"]

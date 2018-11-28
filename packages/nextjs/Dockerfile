FROM node:10-alpine

WORKDIR /usr/src/app

# RUN apk --no-cache --update add git

COPY package.json yarn.lock ./
RUN yarn --silent
COPY ./ ./
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]

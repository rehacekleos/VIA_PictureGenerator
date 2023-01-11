FROM node:16-alpine

WORKDIR /via/app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci --only=production

RUN apk add gettext

COPY build ./build

ENV NODE_ENV=production

EXPOSE 8080

WORKDIR /via/app

CMD ["/bin/sh",  "-c",  "envsubst < ./build/fe/assets/docker/env.template.js > ./build/fe/assets/docker/env.js && node ./build/index.js"]
# Build
FROM node:20-alpine3.19 AS build

USER node
WORKDIR /usr/src/app
ENV NODE_ENV production

COPY --chown=node:node package*.json .
RUN npm ci --include=dev
COPY --chown=node:node  . .

RUN npm run build

# Prod
FROM node:20-alpine3.19 
RUN apk add dumb-init

WORKDIR /usr/src/app
ENV NODE_ENV production

COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node  package*.json .

RUN npm ci --omit=dev && npm cache clean --force
USER node

EXPOSE 3000
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "./dist/index.js"]





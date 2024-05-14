# Build
FROM node:20-alpine3.19 AS build

USER node
WORKDIR /usr/src/app
ENV NODE_ENV production

COPY --chown=node:node package*.json .
RUN npm ci --include=dev
COPY --chown=node:node  . .

run npx prisma generate 

RUN npm run build

# Prod
FROM node:20-alpine3.19 
RUN apk add dumb-init

WORKDIR /usr/src/app
ENV NODE_ENV production

COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node  package*.json .

RUN npm ci --omit=dev  && npm cache clean --force

COPY --from=build --chown=node:node /usr/src/app/node_modules/@prisma/client/ ./node_modules/@prisma/client/
COPY --from=build --chown=node:node /usr/src/app/node_modules/.prisma/client/ ./node_modules/.prisma/client/

USER node

EXPOSE 3000
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "run", "start"]





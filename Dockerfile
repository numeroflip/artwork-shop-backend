# Build
FROM node:20-alpine3.19 AS build

USER node
WORKDIR /usr/src/app

COPY --chown=node:node package*.json .
RUN npm ci --include=dev
COPY --chown=node:node  . .

run npx prisma generate 

EXPOSE 3000
CMD ["npm", "run", "dev"]




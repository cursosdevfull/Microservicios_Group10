FROM node:alpine3.18 as BUILDER

ARG BASE_DIR

WORKDIR /build

COPY ${BASE_DIR}/package.json .

RUN npm install

COPY ${BASE_DIR}/. .

RUN npm run build

FROM node:alpine3.18

WORKDIR /app

COPY --from=BUILDER /build/dist ./dist
COPY --from=BUILDER /build/node_modules ./node_modules
COPY --from=BUILDER /build/package.json ./package.json

CMD ["npm", "run", "start"]
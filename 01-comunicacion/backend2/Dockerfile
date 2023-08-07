FROM node:alpine3.18

ARG dir=backend2

WORKDIR /myapp

COPY ${dir}/package.json .

RUN npm install

COPY ${dir}/. .

CMD ["npm", "start"]
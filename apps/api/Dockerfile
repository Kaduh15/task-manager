FROM node:20-alpine

WORKDIR /app

COPY package.json *lock* tsconfig.json ./

RUN npm install

COPY ./src ./src
COPY ./docs ./docs
COPY ./prisma ./prisma

RUN npm run build

CMD [ "npm", "run", "start" ]
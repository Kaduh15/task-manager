FROM node:20-alpine

WORKDIR /app

COPY package.json *lock* tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start" ]
FROM node:24

RUN apt-get update && apt-get install -y mariadb-client-core

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]
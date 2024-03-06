FROM node:20.4.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000:5000

RUN npm run build

ENV TZ=America/Sao_Paulo

CMD ["npm", "run", "start"]

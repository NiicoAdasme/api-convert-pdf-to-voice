FROM node:16

WORKDIR /pdf-to-voice

COPY package*.json .

RUN npm install

COPY . .

CMD node index.js
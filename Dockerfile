FROM node:19-alpine

WORKDIR /app
COPY package.json .

RUN npm i --only=production

COPY . .

CMD ["npm", "run", "start"]

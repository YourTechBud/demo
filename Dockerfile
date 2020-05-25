
FROM node:10-alpine

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm install --only=prod

# Bundle app source
COPY . .

CMD [ "node", "index.js" ]
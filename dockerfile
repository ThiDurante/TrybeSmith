FROM node:16

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./src ./
CMD ["sh", "-c", "npm run restore && npm start"]
FROM node:16

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./src ./
CMD ["sh", "-c", "sleep 15 && npm i && npm run restore && npm run dev"]
# CMD ["sh", "-c", "sleep 15 && npm i && npm run restore && npm start"]
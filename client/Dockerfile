FROM node:14.16.1-alpine3.10
WORKDIR /app/client
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

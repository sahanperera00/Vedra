FROM node:alpine
WORKDIR /app/userbackend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8084
CMD ["npm", "start"]
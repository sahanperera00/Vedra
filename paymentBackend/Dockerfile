FROM node:alpine
WORKDIR /app/paymentbackend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8082
CMD ["npm", "start"]

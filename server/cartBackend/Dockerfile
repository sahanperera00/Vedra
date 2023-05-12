FROM node:alpine
WORKDIR /app/cartbackend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8083
CMD ["npm", "start"]

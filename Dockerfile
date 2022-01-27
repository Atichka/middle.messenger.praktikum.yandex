FROM node:16.13.1-alpine
WORKDIR /var/www
COPY . .
RUN npm install && npm build
EXPOSE 3000
CMD node ./server.js


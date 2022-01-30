FROM node:14.17.4
WORKDIR /var/www
COPY . .
RUN npm install && npm build
EXPOSE 3000
CMD node ./server.js


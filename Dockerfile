FROM node:10
USER root

WORKDIR /usr/src/app
COPY . .

RUN npm install npm@latest -g
RUN npm install express body-parser request ejs -S
RUN npm cache verify

EXPOSE 80
CMD [ "npm", "start" ]

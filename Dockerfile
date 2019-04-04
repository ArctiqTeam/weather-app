FROM node:carbon
WORKDIR /usr/src/app
USER root
COPY . .
RUN npm install npm@latest -g
RUN npm cache verify
RUN npm i -S express body-parser request ejs
RUN chmod +x health.sh
EXPOSE 8080
CMD [ "npm", "start" ]

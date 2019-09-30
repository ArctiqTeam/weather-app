FROM node:carbon
WORKDIR /usr/src/app
USER root
ADD https://get.aquasec.com/microscanner /
RUN chmod +x /microscanner
COPY . .
RUN npm install npm@latest -g
RUN npm cache verify
RUN npm i -S express body-parser request ejs
EXPOSE 8080
CMD [ "npm", "start" ]

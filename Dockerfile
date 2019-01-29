FROM node

LABEL "appname"="Tracking app"
LABEL maintainer="mcalle1@eafit.edu.co"
LABEL version="1.0"

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY package.json .
RUN npm install --quiet
RUN npm install nodemon -g --quiet
COPY . .

EXPOSE 3000

CMD nodemon -L --watch . app.js
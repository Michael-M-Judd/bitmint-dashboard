FROM node:8.12.0

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ADD package.json /usr/src/app/package.json
ADD package-lock.json /usr/src/app/package-lock.json

RUN npm install \
    && npm i -g pm2
COPY ./src ./src
COPY ./config ./config

ENV PORT 9001

EXPOSE 9001

CMD ["npm", "start"] 
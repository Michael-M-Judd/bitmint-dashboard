FROM node:8.12.0

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

ENV PATH /usr/src/app/node_modules/.bin:$PATH
ADD package.json /usr/src/app/package.json
ADD package-lock.json /usr/src/app/package-lock.json

RUN mkdir ~/.ssh
RUN touch ~/.ssh/known_hosts
RUN ssh-keyscan github.com >> ~/.ssh/known_hosts
RUN echo "${NPMRC}" > ~/.npmrc && \
    echo "${SSH_PRIVATE_KEY}" > ~/.ssh/id_rsa && \
    chmod 600 ~/.ssh/id_rsa && \
    npm && \
    rm -rf ~/.ssh && \
    rm ~/.npmrc

COPY ./src ./src
# COPY ./bin ./bin
# COPY ./credentials ./credentials
# COPY ./config ./config

EXPOSE 8080

CMD ["npm", "start"] 
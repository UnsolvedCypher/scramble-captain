FROM node:14
WORKDIR /usr/src/scramble-captain-client
ADD . ./
ARG SCRAMBLE_CAPTAIN_DOMAIN
RUN yarn install && yarn build && yarn cache clean
EXPOSE 3000
CMD yarn start
FROM node:14
WORKDIR /usr/src/scramble-captain-client
ADD . ./
ENV SERVER_URL=http://localhost:5000
RUN yarn install && yarn build && yarn cache clean
EXPOSE 3000
CMD yarn start
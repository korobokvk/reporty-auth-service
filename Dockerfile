FROM node:latest
WORKDIR /usr/src/app
COPY package.json package.json 
RUN npm install && npm install typescript -g && npm install grpc
ENV AUTH_SERVICE_URL=host.docker.internal
COPY . /usr/src/app
RUN tsc

CMD ["npm", "run", "start:prod"]
FROM node:latest
WORKDIR /usr/src/app
COPY package.json package.json 
RUN npm install && npm install tsc -g && npm install grpc
RUN tsc
ENV AUTH_SERVICE_URL=host.docker.internal
COPY . /usr/src/app

CMD ["npm", "run", "start:prod"]
FROM node:latest
WORKDIR /usr/src/app
COPY package.json package.json 
RUN npm install && npm install typescript -g && npm install grpc
ENV DB_PROVIDER_URL=100.96.0.4
COPY . /usr/src/app
RUN tsc

CMD ["npm", "run", "start:prod"]
FROM node:10.16
WORKDIR /usr/src/app
COPY package.json package.json 
RUN npm install
COPY . /usr/src/app

CMD ["npm", "run", "start:dev"]
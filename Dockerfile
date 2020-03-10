FROM node:latest
WORKDIR /usr/src/app
COPY package.json package.json 
RUN npm install
RUN tsc
ENV AUTH_SERVICE_URL=host.docker.internal
COPY dist /usr/src/app

CMD ["npm", "run", "dev"]
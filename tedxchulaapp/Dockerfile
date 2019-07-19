FROM node:latest

WORKDIR '/node'
COPY ./package-lock.json .
COPY ./package.json .

RUN  npm install
RUN  npm install mongoose --save
COPY . .


CMD ["npm" , "start"]
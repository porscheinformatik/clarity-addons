FROM node:8.6

WORKDIR /app
COPY ./ /app
RUN npm install
WORKDIR /app/latest
RUN npm install
RUN npm rebuild node-sass
RUN npm run deploy

WORKDIR /app
EXPOSE 8080
CMD npm run start
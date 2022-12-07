FROM node:19-alpine

WORKDIR /app

COPY . .

WORKDIR /app/location-tracker

RUN npm install

EXPOSE 3000

CMD npm run dev
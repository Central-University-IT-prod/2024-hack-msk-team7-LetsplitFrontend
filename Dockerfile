FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

FROM node:20 AS serve

WORKDIR /app

COPY --from=build /app/build ./build

RUN npm install -g serve

ENTRYPOINT ["serve", "-s", "build", "-l", "3000"]
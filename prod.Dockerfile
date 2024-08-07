FROM node:20-alpine AS build-stage

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /app/dist/at-accelerator/browser /usr/share/nginx/html

EXPOSE 80


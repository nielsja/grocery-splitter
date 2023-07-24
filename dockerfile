### STAGE 1: Build ###
FROM node:18.10 AS build
WORKDIR /src/app
COPY package.json package-lock.json ./
RUN npm install 
# npm ci
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.25.1
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /src/app/dist/grocery-splitter /usr/share/nginx/html


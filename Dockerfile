# build environment
FROM node:latest as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
RUN git clone -b develop https://github.com/mbudget0x01/street-learning-app-v2.git ./
RUN npm install server
RUN npm install client
RUN npm run build client
RUN npm build server

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

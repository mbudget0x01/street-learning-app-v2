# build environment
FROM node:latest as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
RUN git clone -b develop-docker https://github.com/mbudget0x01/street-learning-app-v2.git ./

WORKDIR /app/client
RUN npm install
RUN npm run build

WORKDIR /app/server
RUN npm install
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/client/build /usr/share/nginx/html/client
COPY --from=build /app/server/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

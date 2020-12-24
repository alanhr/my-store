# Stage 1 - the build process
FROM node:14.15.3-alpine3.10 as build-deps
WORKDIR /usr/src/app
COPY package.json tsconfig.json ./
RUN yarn
COPY  src ./src
COPY  public ./public
RUN yarn build

# Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
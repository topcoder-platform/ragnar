FROM node:8.9-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install -g nodemon --silent
RUN echo "installing packages"
RUN npm install --silent
COPY . .
EXPOSE 80
CMD npm start

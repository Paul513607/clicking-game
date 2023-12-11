FROM node:18-alpine

# set default dir so that next commands executes in /home/app dir
WORKDIR /project

COPY package*.json ./
COPY tsconfig.json ./

# will execute npm install in /home/app because of WORKDIR
RUN npm install

COPY . .

ENV PORT=8080
ENV DB_NAME=clicking-game
ENV DB_USER=postgres
ENV DB_PASSWORD=postgres

EXPOSE 8080

# run app.js after the file has been created

CMD [ "npm", "run", "start" ]
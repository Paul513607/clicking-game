FROM node:18-alpine

# set default dir so that next commands executes in /home/app dir
WORKDIR /project

COPY package*.json ./
COPY tsconfig.json ./

# will execute npm install in /home/app because of WORKDIR
RUN npm install

COPY . .

ENV PORT=4200
ENV DB_URL=http://clicking-game-db:8080

EXPOSE 4200

# run app.js after the file has been created

CMD [ "npm", "run", "start" ]
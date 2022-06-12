FROM node:14.9
 
WORKDIR /usr/src/app
 
COPY package*.json ./
 
RUN npm install
 
COPY . .
 
EXPOSE 3000
 
CMD npm start --host 0.0.0.0 --port 3000
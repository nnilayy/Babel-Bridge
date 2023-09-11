FROM node:alpine 
WORKDIR '/my-react-app'
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]
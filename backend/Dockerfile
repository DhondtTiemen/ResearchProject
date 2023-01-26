FROM node:18-bullseye-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# The magic fix, which is making the world a better place
RUN apt-get update && apt-get install -y unixodbc-dev

RUN npm install

# Bundle app source
COPY . .

# Install mysql driver
RUN npm run build

# Start the app
CMD [ "npm", "start" ]

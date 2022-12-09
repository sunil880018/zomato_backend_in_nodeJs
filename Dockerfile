# we need node image to run your app in container
# node :<version>-alpine
FROM node:16-alpine 
    


# your container run in app directory,this is technically not necessary, /app present in docker container
WORKDIR /app      



# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./


RUN npm install

# If you are building your code for production
RUN npm ci --only=production

# Bundle app source into container directory
COPY . .

EXPOSE 8080
CMD [ "node", "main.js" ]


# building image
# 1.docker build . -t <your username>/node-web-app

# see docker images
# 2. docker images

# run the image
# 3.docker run -p 49160:8080 -d <your username>/node-web-app


# Get container ID
# docker ps

# Print app output
#  docker logs <container id>

# Example
# Running on http://localhost:8080

# Enter the container
# docker exec -it <container id> /bin/bash


# Kill our running container
# docker kill <container id>
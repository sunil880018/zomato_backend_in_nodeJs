# we need node image to run your app in container
# node :<version>-alpine
FROM node:16-alpine 
    


# your container run in app directory,this is technically not necessary, /app present in docker container
WORKDIR /app      



# this is equal to COPY package.json /app
# package.json contains all the libraries name or dependencies name which you have used in the project
COPY package.json  .   



# install all the dependencies contains in package.json file , this is build time
# RUN npm install --only=production  # for the production
RUN npm install        


# copy all the folders and files of the application into the docker image or docker container 
COPY . ./             



# container run on 3000 port
EXPOSE 3000           


# commands to run the application
CMD ["npm ","start"]      

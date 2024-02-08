# Use an official Node runtime as the base image
FROM node:18.19.0

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json into the directory /app in container
COPY package*.json ./

# Install any needed packages
RUN npm install

# Bundle app source
COPY . .

# Make port 3000 available to the outside world
EXPOSE 3000

# Define the command to run the app
CMD [ "npm", "start" ]
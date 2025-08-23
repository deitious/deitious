# Use the official Node.js image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app is running on (adjust this if needed)
EXPOSE 3000

# Command to run your app (adjust to the entry point file)
CMD ["node", "index.js"]

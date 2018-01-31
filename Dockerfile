FROM node:alpine

EXPOSE 3333
WORKDIR /app
ADD . .

# Install depends and build
RUN yarn install

# Run nginx
CMD node server.js

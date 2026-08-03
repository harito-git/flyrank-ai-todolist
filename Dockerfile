#1. from where the base image will build and extend.
FROM node:22.14.0-alpine
#2. define the working directory
WORKDIR /flyrank-ai-todolist
#3. Copy the files you need.
COPY . .
RUN npm install
CMD ["node", "./index.js"]


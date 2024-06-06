FROM node:20-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV WDS_SOCKET_PORT 0
COPY package*.json ./
RUN npm install
RUN mkdir -p node_modules/.cache
RUN chmod -R 755 node_modules/.cache
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]

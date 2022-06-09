FROM node:gallium-alpine

COPY . .
WORKDIR src/
RUN npm install --save
RUN npm run build
ENTRYPOINT ["npm", "run", "start"]

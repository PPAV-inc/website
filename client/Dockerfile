FROM node:12

WORKDIR /home/app

COPY package.json yarn.lock ./

COPY . .

RUN yarn

RUN yarn build

EXPOSE 7000

CMD ["yarn", "start"]

FROM node:12

WORKDIR /home/app

COPY package.json yarn.lock ./

COPY . .

RUN yarn

EXPOSE 6000

CMD ["yarn", "dev"]

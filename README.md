# website

## Install

```
$ git clone https://github.com/PPAV-inc/website.git
$ cd website
$ npm run install-all
```

## Run

Open two terminals for server and client.

### Server

```
$ cd server
$ docker-compose up -d
$ npm run dev
```

In the first time, run

```
$ npm run seed-setup
$ npm run seed
```

after running `docker-compose up -d`

### Client

```
$ cd client
$ npm run dev
```
Then, open http://localhost:3000

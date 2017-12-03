const path = require('path');

const express = require('express');
const favicon = require('serve-favicon');
const next = require('next');
const proxy = require('proxy-middleware');

const routes = require('./routes');

require('dotenv').config();

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  express()
    .use(
      '/graphql',
      proxy(
        `http://${process.env.SERVER_GRAPHQL_URL || 'localhost'}:8080/graphql`
      )
    )
    .use(favicon(path.join(__dirname, 'static', 'favicon.ico')))
    .use(handler)
    .listen(3000, () => {
      console.log('client on: http://localhost:3000');
    });
});

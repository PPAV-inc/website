const path = require('path');

const express = require('express');
const favicon = require('serve-favicon');
const next = require('next');
const proxy = require('proxy-middleware');

const routes = require('./routes');

require('dotenv').config();

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);
const { PORT = 3000, SERVER_GRAPHQL_URL = 'http://localhost:8080' } = process.env;

app.prepare().then(() => {
  express()
    .use('/graphql', proxy(`${SERVER_GRAPHQL_URL}/graphql`))
    .use(favicon(path.join(__dirname, 'static', 'favicon.ico')))
    .use(handler)
    .listen(PORT, () => {
      console.log(`client on: http://localhost:${PORT}`);
    });
});

import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaBody from 'koa-bodyparser';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';

const app = new Koa();
const router = new KoaRouter();

// koaBody is needed just for POST.
router.post('/graphql', koaBody(), graphqlKoa({}));
router.get('/graphql', graphqlKoa({}));

router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;

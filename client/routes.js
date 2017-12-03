const nextRoutes = require('next-routes');

const routes = nextRoutes();

routes.add('index', '/');
routes.add('search', '/s/:keyword/:category');
routes.add('video', '/video/:id');
routes.add('about', '/about/about-us');
routes.add('bot');

module.exports = routes;

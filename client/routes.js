const nextRoutes = require('next-routes');

const routes = nextRoutes();

routes.add('index', '/');
routes.add('search', '/s/:keyword/:category');
routes.add('video', '/video/:id');
routes.add('about');
routes.add('bot');
routes.add('help');
routes.add('terms', 'terms-of-service');
routes.add('sitemap');
routes.add('privacy');

module.exports = routes;

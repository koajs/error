
/**
 * Module dependencies.
 */

var Koa = require('koa');
var error = require('./');
var app = new Koa();

app.use(error());

app.use(function(ctx) {
  if (ctx.request.url === '/404') return Promise.resolve();
  foo();
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('listening on port %s', port);

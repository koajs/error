
/**
 * Module dependencies.
 */

var koa = require('koa');
var error = require('./');
var app = koa();

app.use(error());

app.use(function *(){
  if (this.path === '/favicon.ico') return;
  if (this.path === '/404') return;
  foo();
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('listening on port %s', port);

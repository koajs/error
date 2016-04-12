
/**
 * Module dependencies.
 */

var error = require('../');
var koa = require('koa');
var app = koa();

app.use(error({
  template: __dirname + '/error.html'
}));

app.use(function *(){
  if (this.path === '/404') return;

  foo();
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('listening on port %s', port);

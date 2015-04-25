
/**
 * Module dependencies.
 */

var koa = require('koa');
var error = require('./');
var swig = require('swig');
var app = koa();

app.use(error({}, swig));

app.use(function *(){
  if (this.path === '/404') return;
  
  foo();
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('listening on port %s', port);

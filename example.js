
/**
 * Module dependencies.
 */

var koa = require('koa');
var error = require('./');
var app = koa();

app.use(error());

app.use(function *(){
  foo();
});

app.listen(3000);
console.log('listening on port 3000');
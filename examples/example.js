
'use strict';

/**
 * Module dependencies.
 */

const join = require('path').join;
const error = require('../');
const Koa = require('koa');
const app = new Koa();

app.use(error({
  engine: 'lodash',
  template: join(__dirname, '../error.html')
}));

app.use(function (ctx){
  if (ctx.path === '/404') return Promise.resolve();

  return foo();
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('listening on port %s', port);

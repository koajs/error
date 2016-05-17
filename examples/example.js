
'use strict';

/**
 * Module dependencies.
 */

const join = require('path').join;
const error = require('../');
const koa = require('koa');
const app = koa();

app.use(error({
  engine: 'lodash',
  template: join(__dirname, '../error.html')
}));

app.use(function *(){
  if (this.path === '/404') return;

  foo();
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('listening on port %s', port);

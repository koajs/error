
'use strict';

const request = require('supertest');
const error = require('../');
const koa = require('koa');

describe('koa-error', () => {
  it('default', done => {
    const app = koa();

    app.use(error());

    app.use(function *(){
      foo();
    });

    request(app.listen())
    .get('/')
    .expect(500)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(/\<title\>Error - 500\<\/title\>/)
    .end(done)
  })

  it('use ejs', done => {
    const app = koa();

    app.use(error({
      template: __dirname + '/error.ejs',
      engine: 'ejs'
    }));

    app.use(function *(){
      foo();
    });

    request(app.listen())
    .get('/')
    .expect(500)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(/\<title\>Error by ejs - 500\<\/title\>/)
    .end(done)
  })
})

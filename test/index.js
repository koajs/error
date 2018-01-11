
'use strict'

const request = require('supertest')
const { join } = require('path')
const error = require('../')
const Koa = require('koa')

describe('koa-error', () => {
  it('default', done => {
    const app = new Koa()

    app.use(error())

    app.use(function (ctx) {
      foo() // eslint-disable-line
    })

    request(app.listen())
      .get('/')
      .expect(500)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(/<title>Error - 500<\/title>/)
      .end(done)
  })

  it('use ejs', done => {
    const app = new Koa()

    app.use(error({
      template: join(__dirname, '/error.ejs'),
      engine: 'ejs'
    }))

    app.use(function (ctx) {
      foo() // eslint-disable-line
    })

    request(app.listen())
      .get('/')
      .expect(500)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(/<title>Error by ejs - 500<\/title>/)
      .end(done)
  })

  it('ignores bad statuses', done => {
    const app = new Koa()

    app.use(error())

    app.use(function (ctx) {
      const error = new Error('I have status')
      error.status = 'This is broke'
      throw error
    })

    request(app.listen())
      .get('/')
      .expect(500)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(/<title>Error - 500<\/title>/)
      .end(done)
  })
})

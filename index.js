
'use strict'

/**
 * Module dependencies.
 */

const consolidate = require('consolidate')
const { join } = require('path')
const http = require('http')

/**
 * Expose `error`.
 */

module.exports = error

/**
 * Error middleware.
 *
 *  - `template` defaults to ./error.html
 *
 * @param {Object} opts
 * @api public
 */

function error (opts) {
  opts = opts || {}

  const engine = opts.engine || 'lodash'

  const accepts = opts.accepts || [ 'html', 'text', 'json' ]

  // template
  const path = opts.template || join(__dirname, '/error.html')

  // env
  const env = opts.env || process.env.NODE_ENV || 'development'

  var cache = opts.cache
  if (cache == null) cache = env !== 'development'

  return async function error (ctx, next) {
    try {
      await next()
      if (ctx.response.status === 404 && !ctx.response.body) ctx.throw(404)
    } catch (err) {
      ctx.status = typeof err.status === 'number' ? err.status : 500

      // application
      ctx.app.emit('error', err, ctx)

      // accepted types
      switch (ctx.accepts.apply(ctx, accepts)) {
        case 'text':
          ctx.type = 'text/plain'
          if (env === 'development') ctx.body = err.message
          else if (err.expose) ctx.body = err.message
          else throw err
          break

        case 'json':
          ctx.type = 'application/json'
          if (env === 'development') ctx.body = { error: err.message, stack: err.stack, originalError: err }
          else if (err.expose) ctx.body = { error: err.message, originalError: err }
          else ctx.body = { error: http.STATUS_CODES[ctx.status] }
          break

        case 'html':
          ctx.type = 'text/html'
          ctx.body = await consolidate[engine](path, {
            originalError: err,
            cache: cache,
            env: env,
            ctx: ctx,
            request: ctx.request,
            response: ctx.response,
            error: err.message,
            stack: err.stack,
            status: ctx.status,
            code: err.code
          })
          break
      }
    }
  }
}

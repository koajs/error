/**
 * Module dependencies.
 */

var swig = require('swig');
var http = require('http');

/**
 * Expose `error`.
 */

module.exports = error;

/**
 * Error middleware.
 *
 *  - `template` defaults to ./error.html
 *
 * @param {Object} opts
 * @api public
 */

function error(opts) {
  opts = opts || {};

  // template
  var path = opts.template || __dirname + '/error.html';
  var render = swig.compileFile(path);

  // env
  var env = process.env.NODE_ENV || 'development';

  return function error(ctx, next) {
    return next()
      .then(() => {
        if (404 == ctx.response.status && !ctx.response.body) ctx.throw(404);
      })
      .catch((err) => {
        ctx.status = err.status || 500;

        // application
        ctx.app.emit('error', err, ctx);

        // accepted types
        switch (ctx.accepts('html', 'text', 'json')) {
          case 'text':
            ctx.type = 'text/plain';
            if ('development' == env) ctx.body = err.message
            else if (err.expose) ctx.body = err.message
            else throw err;
            break;

          case 'json':
            ctx.type = 'application/json';
            if ('development' == env) ctx.body = { error: err.message }
            else if (err.expose) ctx.body = { error: err.message }
            else ctx.body = { error: http.STATUS_CODES[ctx.status] }
            break;

          case 'html':
            ctx.type = 'text/html';
            ctx.body = render({
              env: env,
              ctx: ctx,
              request: ctx.request,
              response: ctx.response,
              error: err.message,
              stack: err.stack,
              status: ctx.status,
              code: err.code
            });
            break;
        }
    })
  }
}

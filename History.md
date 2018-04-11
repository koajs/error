
3.2.0 / 2018-04-11
==================

  * Provide original error, which may contain custom properties. (#33)

3.1.1 / 2018-01-11
==================

  * bump deps

3.1.0 / 2017-07-23
==================

  * added a `stack` field to json when `NODE_ENV=development`

3.0.2 / 2017-07-23
==================

  * added option `env`
  * added option `accepts`

3.0.1 / 2017-05-15
==================

  * added guard for status code (#29)

3.0.0 / 2017-03-01
==================

  * update to koa@2
  * bump deps

2.1.0 / 2016-05-26
==================

  * Use lodash templates instead of swig

2.0.0 / 2016-04-13
==================

  * refactor: use co-render (consolidate), add ability to inject other render engines
  * add test

1.1.3 / 2014-11-28
==================

  * pass `err.message` to the frontend

1.1.2 / 2014-05-08
==================

  * Loosen swig dep
  * Status code on default exception
  * Fixed priority of accepted types

1.1.1 / 2014-01-11
==================

 * fix handle non-thrown 404 errors.

1.1.0 / 2013-12-25
==================

 * add app error event

1.1.0 / 2013-12-21
==================

 * add: log the response length of streams
 * add: humanize the response time
 * add: log when response is finished/closed, not caught upstream

1.0.1 / 2013-08-22
==================

 * fix exception handling

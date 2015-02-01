# koa-error

  Error response middleware for koa supporting:

- text
- json
- html

## Installation

```js
$ npm install koa-error
```

## Options

You have three options for rendering the error page:

 - `view` a [koa-views](https://github.com/queckezz/koa-views) compatible view
   name to be passed to `ctx.render(view, locals)`
 - `render` function taking a single `locals` argument to render the template
 - `template` path to template written with
   `[Swig](http://paularmstrong.github.io/swig/) 

Each option is attempted in the order listed. If you provide a Swig `template`,
you must include `swig` in your dependencies. Likewise, if you provide a
`view`, you must include the appropriate middleware.

## Custom templates

  By using the `render` or `template` option you can override the bland default
  template, with the following available local variables:

  - `env`
  - `ctx`
  - `request`
  - `response`
  - `error`
  - `stack`
  - `status`
  - `code`

Here's an example Swig template:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Error - {{status}}</title>
  </head>
  <body>
    <div id="error">
      <h1>Error</h1>
    <p>Looks like something broke!</p>
    {% if env == 'development' %}
      <h2>Message:</h2>
      <pre>
        <code>
{{error}}
        </code>
      </pre>
      <h2>Stack:</h2>
      <pre>
        <code>
{{stack}}
        </code>
      </pre>
    {% endif %}
    </div>
  </body>
</html>
```

## License

  MIT

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

 - `render` function taking a single `locals` argument to render the template
 - `template` path to template written with
   `[Swig](http://paularmstrong.github.io/swig/) 
   (if `render` function not provided)

If you provide a Swig template, you must include `swig` in your dependencies.

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

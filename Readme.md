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

 - `template` path to template written with your template engine
 - `engine` template engine name passed to [consolidate](https://github.com/tj/consolidate.js)
 - `options` template engine options passed to [consolidate](https://github.com/tj/consolidate.js), [more-consolidate-options](https://github.com/tj/consolidate.js/blob/master/lib/consolidate.js)
 - `cache` cached compiled functions, default: `NODE_ENV != 'development'`
 - `env` force a NODE_ENV, default: `development`
 - `accepts` mimetypes passed to [ctx.accepts](https://github.com/koajs/koa/blob/master/docs/api/request.md#requestacceptstypes), default: `[ 'html', 'text', 'json' ]`

## Custom templates

  By using the `template` option you can override the bland default template,
  with the following available local variables:

  - `env`
  - `ctx`
  - `request`
  - `response`
  - `error`
  - `stack`
  - `status`
  - `code`

Here are some examples:

### Pug (formerly jade)

```js
app.use(error({
  engine: 'pug',
  template: __dirname + '/error.pug'
}));
```

```jade
doctype html
html
  head
    title= 'Error - ' + status
  body
    #error
      h1 Error
      p Looks like something broke!
      if env == 'development'
        h2 Message:
        pre: code= error
        h2 Stack:
        pre: code= stack
```

### Nunjucks

```js
app.use(error({
  engine: 'nunjucks',
  template: __dirname + '/error.njk'
}));
```

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

#### Custom filters, use macro,block in Nunjucks

koa-error engine tool base on [consolidate](https://github.com/tj/consolidate.js), you can also set consolidate options 
 
> [more-nunjucks-options](https://github.com/tj/consolidate.js/blob/master/lib/consolidate.js#L1317-L1370)

`app.js`:

```js
//...
const app = new Koa();
const nunjucks = require('nunjucks');
const nunjucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader(path.join(__dirname, 'tpl')));

// add filters
const filters = require('./filters');
for(let [k, v] of Object.entries(filters)){
    nunjucksEnv.addFilter(k, v);
}

//...
app.use(koaError({
    //...
    template: path.join(__dirname, 'tpl/error.html'),
    options: {
        nunjucksEnv // custom nunjucks env
    }
}));
```

`filters.js`:

```js
module.exports = { 
    // define filters function here
    stringify(..args){
        return JSON.stringify(...args);
    }
    //...
};
```

`tpl/error.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    {% include "./com.html" %}
  </head>
  <body>
    <p>{{ request | stringify }}</p> {# use filters here #}
    <!-- ... -->
  </body>
</htm>
```

`tpl/com.html`:

```html
<link rel="stylesheet" href="/css/normalize.css" />
```


## License

  MIT

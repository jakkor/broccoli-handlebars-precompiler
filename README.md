# Broccoli Handlebars Precompiler

[Broccoli](https://github.com/broccolijs/broccoli) plugin that gives us an easy way to precompile [Handlebars](http://handlebarsjs.com/) templates.

It opens every handlebar file and creates js file that can be later combine by different tool.

### Install
```
npm install --save broccoli-handlebars-precompiler
```

### Example
```js
var broccoliHandlebars = require('broccoli-handlebars-precompiler');

var tree = broccoliHandlebars(tree, {
  srcDir: 'js/templates',
  namespace: 'App.templates'
});

```

### Usage

```js
var tree = broccoliHandlebars(tree, options);
```
- **tree** - a broccoli tree
- **options** - options, see below

### Options

### srcDir (required)

Source directory where handlebars are stored.

### namespace (optional)

Namespace where all templates will be added. Default is Handlebars.templates.

### extensions (optional)

Array of handlebars file extensions. Default is hbs and handlebars.

### targetExtension (optional)

Array of target extensions. Default is js.

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

### How to use it in javascript application

Sample templates files.

```
productList.hbs
products/item.hbs

```

After precompiling with namespace 'App.templates' accessing those is quite easy.

Templates from main folder:
```javascript
App.templates.productList({hondaCivic:"Honda Civic for sale", citroenXsara:"Citroen Xsara for sale"});
```

Templates from subfolders:
```javascript
App.templates["products/item"]({name:"Honda Civic", price:"10.000"});
```

### Usage in Broccoli file

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

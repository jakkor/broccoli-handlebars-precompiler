var Filter = require('broccoli-filter'),
    handlebars = require('handlebars');

module.exports = HandlebarsFilters;

HandlebarsFilters.prototype = Object.create(Filter.prototype);
HandlebarsFilters.prototype.constructor = HandlebarsFilters;

function HandlebarsFilters (tree, options) {
  if (!(this instanceof HandlebarsFilters))
  {
      return new HandlebarsFilters(tree, options)
  }

  if (!('srcDir' in options)) {
    console.log('HandlebarsFilters: ERROR! No srcDir set.');
    return tree;
  }

  // Set default options
  this.options = options || {};
  this.options.extensions = options.extensions || ['hbs', 'handlebars'];
  this.options.targetExtension = options.targetExtension || ['js'];
  this.options.srcDir = options.srcDir || null;
  this.options.namespace = options.namespace || 'Handlebars.templates';

  // Set options necessary for the filter
  filterOptions = {
    srcDir: this.options.srcDir,
    extensions: this.options.extensions,
    targetExtension: this.options.targetExtension
  };

  Filter.call(this, tree, filterOptions);
}

HandlebarsFilters.prototype.processString = function (string, srcFile) {
  try {
    var templateName = this.getTemplateName(srcFile);
    var precompiled = handlebars.precompile(string, this.options);
    var output = this.options.namespace + '[\'' + templateName + '\'] = Handlebars.template(' + precompiled + ')';
    return output;
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * Set the template name
 * @param  {string} srcFile src file path
 * @return {string} template name
 */
HandlebarsFilters.prototype.getTemplateName = function (srcFile) {
    var templateName = srcFile;

    //Remove templates path
    if (this.options.srcDir !== null) {
      templateName = templateName.replace(this.options.templateName, '');
    }

    //Remove / if there is any
    if (templateName.indexOf('/') === 0) {
      templateName = templateName.substr(1, templateName.length);
    }

    //Remove extension
    for (var i = 0; i < this.options.extensions.length; i++) {
      var ext = '.' + this.options.extensions[i];
      var extPos = templateName.indexOf(ext);
      if (extPos > -1 && extPos === (templateName.length - ext.length)) {
        templateName = templateName.substr(0, extPos);
      }
    }

    return templateName;
}
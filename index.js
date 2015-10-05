var path = require('path'),
    Filter = require('broccoli-filter'),
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
    var output = this.options.namespace + ' = ' + this.options.namespace + ' || {};';
    output += this.options.namespace + '[\'' + templateName + '\'] = Handlebars.template(' + precompiled + ');';
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
    var templateName = srcFile, regexp;

    //Remove templates path
    if (this.options.srcDir && this.options.srcDir !== '.') {
      templateName = templateName.replace(this.options.srcDir, '');
    }

    //Remove / if there is any
    if (templateName.indexOf('/') === 0) {
      templateName = templateName.substr(1, templateName.length);
    }

    //Remove extension
    var ext = path.extname(templateName);
    if (this.options.extensions.indexOf(ext.replace('.', '')) >= 0) {
      regexp = new RegExp(ext + '$');
      templateName = templateName.replace(regexp, '');
    }

    return templateName;
}

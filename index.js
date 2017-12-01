'use strict';

const util = require('util');
const typeOf = require('kind-of');
const isPlainObject = require('is-plain-object');
const prettier = require('prettier');
const defaults = {
  printWidth: 60,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  parser: 'babylon',
  semi: true
};

function inspect(val, options, filter) {
  if (typeof options === 'function') {
    options = { filter: options };
  }

  const set = new Set();
  const opts = Object.assign({filter: filter}, options);
  const prettierOpts = Object.assign({}, defaults, options);
  delete prettierOpts.filter;
  filter = opts.filter;

  function format(val, parent) {
    switch (typeOf(val)) {
      case 'array':
        return format.array(val, parent);
      case 'boolean':
        return format.boolean(val);
      case 'buffer':
        return format.buffer(val);
      case 'date':
        return format.date(val);
      case 'error':
        return format.error(val);
      case 'function':
        return format.function(val);
      case 'null':
        return format.null(val);
      case 'number':
        return format.number(val);
      case 'object':
      case 'arguments':
        return format.object(val, parent);
      case 'regexp':
        return format.regexp(val);
      case 'string':
        return format.string(val);
      case 'symbol':
        return format.symbol(val);
      case 'undefined':
        return format.undefined(val);
      default: {
        return format.other(val);
      }
    }
  }

  format.boolean = function(val) {
    return util.inspect(val);
  };

  format.buffer = function(val) {
    return util.inspect(val);
  };

  format.date = function(val) {
    return util.inspect(val);
  };

  format.error = function(val) {
    return util.inspect(val);
  };

  format.null = function(val) {
    return String(val);
  };

  format.number = function(val) {
    return util.inspect(val);
  };

  format.other = function(val) {
    return util.inspect(val);
  };

  format.regexp = function(val) {
    return util.inspect(val);
  };

  format.string = function(val) {
    return util.inspect(val.replace(/^['"]|[;'"]*$/g, ''));
  };

  format.symbol = function(val) {
    return util.inspect(val);
  };

  format.undefined = function(val) {
    return String(val);
  };

  format['function'] = function(val) {
    return val.toString();
  };

  format.array = function(arr, parent) {
    var str = '[ ';
    for (let i = 0; i < arr.length; i++) {
      str += format(arr[i], arr);
      if (i < arr.length - 1) {
        str += ', ';
      }
    }

    if (arr.hasOwnProperty('input')) {
      str += ', index: ' + format.number(arr.index);
      str += ', input: ' + format.string(arr.input);
    }
    return str + ' ]';
  };

  format.object = function(obj, parent) {
    if (set.has(obj)) {
      return '';
    }

    set.add(obj);
    var str =  '{';

    var keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      var val = obj[key];

      if (typeof filter === 'function' && filter(val, key) === false) {
        continue;
      }

      str += key + ': ' + format(val, obj);
      if (i < keys.length - 1) {
        str += ',\n';
      }
    }

    return str + '}';
  };

  let prefix = 'var __tmp = ';
  let type = typeOf(val);
  let str = format(val);

  switch (type) {
    case 'array':
      // RegExp.exec() or String.match() arguments
      if (val.input) {
        return str;
      }
      str = prefix + str;
      break;
    case 'boolean':
    case 'buffer':
    case 'date':
    case 'error':
    case 'null':
    case 'number':
    case 'regexp':
    case 'string':
    case 'symbol':
    case 'undefined':
      return str;
    case 'object':
      str = prefix + str;
      break;
  }

  var res = prettier.format(str, prettierOpts);
  res = res.replace(prefix, '');

  if (type === 'object' && !isPlainObject(val) && val.constructor) {
    res = val.constructor.name + ' ' + res;
  }
  return res;
}

module.exports = inspect;

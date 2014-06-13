var traverse = require('traverse');
var matches = require('matches-selector');

module.exports = Dom;

function Dom(nodes) {
  if (!(this instanceof Dom)) return new Dom(nodes);
  this.el = nodes[0] || nodes;
  var els = ('length'in nodes) ? nodes : [nodes];

  Object.keys(methods).forEach(function(key) {
    var fn = methods[key];
    this[key] = function () {
      for (var i = 0, len = els.length; i < len; i++) {
        fn.apply({el: els[i], index:i, els: els}, arguments);
      }
    }
  }.bind(this));

}

/**
 * methods use nodes array
 */
var methods = {};

/**
 * safely remove
 * @api public
 */
methods.remove = function () {
  if (!this.el.parentNode) return;
  this.el.parentNode.removeChild(this.el);
}

methods.clean = function (selector) {
  var nodes = this.el.childNodes;
  var len = nodes.length;
  var els = [].slice.call(nodes);
  els.forEach(function(n) {
    if (selector && !matches(n, selector)) return;
    this.el.removeChild(n);
  }.bind(this));
}

methods.insertBefore = function (node) {
  node.parentNode.insertBefore(this.el, node);
}

methods.insertAfter = function (node) {
  var nextEl = traverse('nextSibling', node)[0];
  if (nextEl) {
    node.parentNode.insertBefore(this.el, nextEl);
  } else {
    node.parentNode.appendChild(this.el);
  }
}

methods.append = function (node) {
  this.el.appendChild(node);
}

methods.prepend = function (node) {
  if (this.el.firstChild) {
    this.el.insertBefore(node, this.el.firstChild);
  } else {
    this.el.appendChild(node);
  }
}

methods.appendTo = function (node) {
  node.appendChild(this.el);
}

methods.prependTo = function (node) {
  if (node.firstChild) {
    node.insertBefore(this.el, node.firstChild);
  } else {
    node.appendChild(this.el);
  }
}

/**
 * set attrs
 * @param {String} obj
 * @api public
 */
methods.attr = function (obj) {
  for (var p in obj) {
    this.el.setAttribute(p, obj[p]);
  }
}

/**
 * set styles
 * @param {String} obj
 * @api public
 */
methods.style = function (obj) {
  for (var p in obj) {
    this.el.style[p] = obj[p];
  }
}

methods.each = function (fn) {
  fn(this.el, this.index, this.els);
}

Dom.prototype.parent = function (selector) {
  var el = this.el;
  if (!selector) return el.parentNode;
  return traverse('parentNode', el, selector)[0];
}

Dom.prototype.parents = function (selector) {
  var el = this.el;
  return traverse('parentNode', el, selector, 100);
}

Dom.prototype.children = function (selector) {
  var el = this.el;
  var nodes = el.childNodes;
  var ret = [];
  var len = nodes.length;
  for (var i = 0 ; i < len; i++) {
    var n = nodes[i];
    if (selector && !matches(n, selector)) continue;
    ret.push(n);
  }
  return ret;
}

Dom.prototype.prev = function (selector) {
  var el = this.el;
  return traverse('previousSibling', el, selector)[0];
}

Dom.prototype.prevAll = function (selector) {
  var el = this.el;
  return traverse('previousSibling', el, selector, Infinity);
}

Dom.prototype.next = function (selector) {
  var el = this.el;
  return traverse('nextSibling', el, selector, 1)[0];
}

Dom.prototype.nextAll = function (selector) {
  var el = this.el;
  return traverse('nextSibling', el, selector, Infinity);
}

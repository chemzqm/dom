var traverse = require('traverse');
var matches = require('matches-selector');

//methods for all nodes
var methods = ['clean', 'remove', 'insertBefore', 'insertAfter', 'append', 'appendTo', 'attr', 'style'];

function Dom(node) {
  if (!(this instanceof Dom)) return new Dom(node);
  this.el = ('length' in node) ? node[0] : node;
  if (node.length) {
    methods.forEach(function(m) {
      var me = this;
      var fn = this[m];
      this[m] = function() {
        for (var j = 0, l = node.length; j < l; j++) {
          fn.apply({ el: node[j] }, arguments);
        }
      }
    })
  }
}

Dom.prototype.clean = function (selector) {
  var nodes = this.el.childNodes;
  for (var i = 0, len = nodes.length; i < len; i++) {
    var n = nodes[i];
    if (selector && !matches(n, selector)) continue;
    this.el.removeChild(n);
  }
}

Dom.prototype.insertBefore = function (node) {
  node.parentNode.insertBefore(this.el, node);
}

Dom.prototype.insertAfter = function (node) {
  var nextEl = traverse(this.el, 'nextSibling')[0];
  if (nextEl) {
    node.parentNode.insertBefore(this.el, nextEl);
  } else {
    node.parentNode.appendChild(this.el);
  }
}

Dom.prototype.append = function (node) {
  this.el.parentNode.appendChild(node);
}

Dom.prototype.appendTo = function (node) {
  node.appendChild(this.el);
}

Dom.prototype.attr = function (obj) {
  for (var p in obj) {
    this.el.setAttribute(p, obj[p]);
  }
}

Dom.prototype.style = function (obj) {
  for (var p in obj) {
    this.el.style[p] = obj[p];
  }
}

Dom.prototype.remove = function () {
  this.el.parentNode.removeChild(this.el);
}

Dom.prototype.parent = function (selector) {
  var el = this.el[0] || this.el;
  if (!selector) return el.parentNode;
  return traverse(el, 'parentNode', selector, 1)[0];
}

Dom.prototype.parents = function (selector) {
  var el = this.el[0] || this.el;
  return traverse(el, 'parentNode', selector);
}

Dom.prototype.children = function (selector) {
  var el = this.el[0] || this.el;
  var nodes = el.childNodes;
  var ret = [];
  for (var i = 0, len = nodes.length; i < len; i++) {
    var n = nodes[i];
    if (matches(n, selector)) ret.push(n);
  }
  return ret;
}

Dom.prototype.prev = function (selector) {
  var el = this.el[0] || this.el;
  return traverse(el, 'previousSibling', selector, 1)[0];
}

Dom.prototype.prevAll = function (selector) {
  var el = this.el[0] || this.el;
  return traverse(el, 'previousSibling', selector);
}

Dom.prototype.next = function (selector) {
  var el = this.el[0] || this.el;
  return traverse(el, 'nextSibling', selector, 1)[0];
}

Dom.prototype.nextAll = function (selector) {
  var el = this.el[0] || this.el;
  return traverse(el, 'nextSibling', selector);
}

Dom.prototype.each = function (fn) {
  var els = ('length' in this.el) ? this.el : [this.el];
  for (var i = 0, len = els.length; i < len; i++) {
    var n = els[i];
    fn(n, i, els);
  }
}

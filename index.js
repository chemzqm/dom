var traverse = require('traverse');
var matches = require('matches-selector');

//methods for all nodes
var methods = ['clean', 'remove', 'insertBefore', 'insertAfter',
            'append', 'appendTo', 'prepend', 'prependTo', 'attr', 'style', 'each'];

module.exports = Dom;

function Dom(node) {
  if (!(this instanceof Dom)) return new Dom(node);
  this.el = ('length' in node) ? node[0] : node;
  if ('length' in node) {
    methods.forEach(function(m) {
      var me = this;
      var fn = this[m];
      this[m] = function() {
        var l = node.length;
        for (var j = 0 ; j < l; j++) {
          fn.apply({ el: node[j], index:j, els:node }, arguments);
        }
      }
    }.bind(this))
  }
}

Dom.prototype.remove = function () {
  if (!this.el.parentNode) return;
  this.el.parentNode.removeChild(this.el);
}

Dom.prototype.clean = function (selector) {
  var nodes = this.el.childNodes;
  var len = nodes.length;
  var els = [].slice.call(nodes);
  els.forEach(function(n) {
    if (selector && !matches(n, selector)) return;
    this.el.removeChild(n);
  }.bind(this));
}

Dom.prototype.insertBefore = function (node) {
  node.parentNode.insertBefore(this.el, node);
}

Dom.prototype.insertAfter = function (node) {
  var nextEl = traverse('nextSibling', node)[0];
  if (nextEl) {
    node.parentNode.insertBefore(this.el, nextEl);
  } else {
    node.parentNode.appendChild(this.el);
  }
}

Dom.prototype.append = function (node) {
  var n = node.cloneNode(true);
  if (node.parentNode) node.parentNode.removeChild(node);
  this.el.appendChild(n);
}

Dom.prototype.prepend = function (node) {
  var n = node.cloneNode(true);
  if (node.parentNode) node.parentNode.removeChild(node);
  if (this.el.firstChild) {
    this.el.insertBefore(n, this.el.firstChild);
  } else {
    this.el.appendChild(node);
  }
}

Dom.prototype.appendTo = function (node) {
  node.appendChild(this.el);
}

Dom.prototype.prependTo = function (node) {
  if (node.firstChild) {
    node.insertBefore(this.el, node.firstChild);
  } else {
    node.appendChild(this.el);
  }
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

Dom.prototype.parent = function (selector) {
  var el = this.el[0] || this.el;
  if (!selector) return el.parentNode;
  return traverse('parentNode', el, selector)[0];
}

Dom.prototype.parents = function (selector) {
  var el = this.el[0] || this.el;
  return traverse('parentNode', el, selector, 100);
}

Dom.prototype.children = function (selector) {
  var el = this.el[0] || this.el;
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
  var el = this.el[0] || this.el;
  return traverse('previousSibling', el, selector)[0];
}

Dom.prototype.prevAll = function (selector) {
  var el = this.el[0] || this.el;
  return traverse('previousSibling', el, selector, Infinity);
}

Dom.prototype.next = function (selector) {
  var el = this.el[0] || this.el;
  return traverse('nextSibling', el, selector, 1)[0];
}

Dom.prototype.nextAll = function (selector) {
  var el = this.el[0] || this.el;
  return traverse('nextSibling', el, selector, Infinity);
}

Dom.prototype.each = function (fn) {
  if (!this.els) throw new Error('should be inited with node array');
  fn(this.el, this.index, this.els);
}

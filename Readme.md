# Dom

[![NPM version](https://badge.fury.io/js/dom-easy.svg)](http://badge.fury.io/js/dom-easy)
[![Build Status](https://secure.travis-ci.org/chemzqm/dom.svg)](http://travis-ci.org/chemzqm/dom)
[![Coverage Status](https://coveralls.io/repos/chemzqm/dom/badge.svg?branch=master&service=github)](https://coveralls.io/github/chemzqm/dom?branch=master)

  Light weight dom traverse & manipulation (no chain or any other thing)

``` js
var _ = require('dom');
var els = document.querySelectorAll('.foo');
_(els).appendTo(document.body);
```

## Installation

  Install with [component(1)](http://component.io):

    $ component install chemzqm/dom

## API

### dom(nodes|node)

initialize dom with node or array of nodes(or array like).

### .clean([selector])

clean the childnodes with selector of empty the node(s).

### .remove()

remove node(s).

### .insertBefore(node)

insert the element(s) before `node`.

### .insertAfter(node)

insert the element(s) after `node`.

### .append(node)

append node to (each) element.

### .appendTo(node)

append element(s) to node.

### .prepend(node)

prepend node to (each) element.

### .prependTo(node)

prepend element(s) to node.

### .attr(object)

set attributes for node(s)

### .style(object)

set styles for node(s)

### .parent([selector])

find parent by selector or direct parent.

### .parents([selector])

find parents by selector or all parents.

### .children([selector])

find direct children by selector or all children.

### .prev([selector])

find previous node by selector or direct previousSibling.

### .next([selector])

find next node by selector or direct previousSibling.

### .prevAll(selector)

find all previous node filter with optional selector.

### .nextAll([selector])

find all next node filter with optional selector.

### .each(fn)

call `fn` with each node with arguments `el, i, els`.

## License

  The MIT License (MIT)


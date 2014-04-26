# Dom

  Light weight dom traverse & manipulation (no weired stuff)

  This component is made for complex component and apps.

  TODO: test

``` js
var _ = require('dom');
//direct children
_(document.body).children();
```

## Installation

  Install with [component(1)](http://component.io):

    $ component install chemzqm/dom

## API

### dom(nodes|node)

* initialize dom with node or array of nodes(or array like).

### .clean([selector])

* clean the childnodes with selector of empty the node(s).

### .remove()

* remove node(s).

### .insertBefore(node)

* insert the element(s) before `node`.

### .insertAfter(node)

* insert the element(s) after `node`.

### .append(node)

* append node to (each) element.

### .appendTo(node)

* append element(s) to node.

### .attr(object)

* set attributes for node(s)

### .style(object)

* set styles for node(s)

### .parent([selector])

* find parent by selector or direct parent.

### .parents([selector])

* find parents by selector or all parents.

### .children([selector])

* find direct children by selector or all children.

### .prev([selector])

* find previous node by selector or direct previousSibling.

### .next([selector])

* find next node by selector or direct previousSibling.

### .prevAll(selector)

* find all previous node by selector or direct previousSibling.

### .nextAll([selector])

* find all next node by selector or direct previousSibling.

### .each(fn)

* call `fn` with each element.

## License

  The MIT License (MIT)


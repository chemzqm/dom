/*global describe, it, beforeEach, afterEach*/
var assert = require('assert')
var _ = require('..')
var domify = require('domify')

function createNodes(l, parent) {
  var ret = []
  for (var i = 1; i < l + 1 ; i ++) {
    ret.push(create(i, parent))
  }
  return ret
}

function create(i, parent) {
  var node =document.createElement('div')
  if (i) {
    node.innerHTML = i
  }
  parent = parent || document.body
  parent.appendChild(node)
  return node
}

function toHtml(nodes) {
  var fragment = document.createDocumentFragment()
  for (var i = 0, len = nodes.length; i < len; i++) {
    var n = nodes[i]
    fragment.appendChild(n)
  }
  return fragment.textContent
}

describe('Dom', function() {
  describe('clean', function () {
    it('should clean the node', function() {
      var node = create('test')
      node.appendChild(domify('<div>'))
      _(node).clean()
      assert(node.childNodes.length === 0)
    })

    it('should clean the nodes', function() {
      var nodes = createNodes(2)
      _(nodes).clean()
      assert(nodes[0].childNodes.length === 0)
      assert(nodes[1].childNodes.length === 0)
    })

    it('should clean the node by selector', function () {
      var node = create()
      node.appendChild(domify('<div class="one">'))
      node.appendChild(domify('<div class="two">'))
      _(node).clean('.one')
      assert.equal(node.childNodes.length, 1)
    })
  })

  describe('remove', function () {
    it('should remove the node', function() {
      var node = create()
      _(node).remove()
      assert.equal(node.parentNode, null)
    })

    it('should remove the nodes', function() {
      var nodes = createNodes(2)
      _(nodes).remove()
      assert.equal(nodes[0].parentNode, null)
      assert.equal(nodes[1].parentNode, null)
    })
  })

  describe('insertBefore', function() {
    it('should insert new node before element', function () {
      var node = create()
      var el = create()
      _(el).insertBefore(node)
      assert.equal(node.previousSibling, el)
    })

    it('should insert each element before node', function() {
      var node = create()
      var els = createNodes(2)
      _(els).insertBefore(node)
      assert.equal(node.previousSibling, els[1])
      assert.equal(els[1].previousSibling, els[0])
    })
  })

  describe('insertAfter', function() {
    it('should insert new node after element', function () {
      var el = create(4)
      var node = create(5)
      _(el).insertAfter(node)
      assert.equal(el.previousSibling, node)
    })

    it('should insert each element after node', function() {
      var els = createNodes(2)
      var node = create(3)
      _(els).insertAfter(node)
      assert.equal(node.nextSibling, els[1])
      assert.equal(els[1].nextSibling, els[0])
    })
  })

  describe('append', function () {
    it('should append node to the element', function() {
      var n = create()
      n.appendChild(domify('<div>'))
      var el = create(1)
      _(n).append(el)
      assert.equal(n.lastChild.textContent, '1')
    })

    it('should append node to each element', function() {
      var els = createNodes(2)
      var el = create(1)
      _(els).append(el)
      els.forEach(function(el) {
        assert.equal(el.lastChild.textContent, '1')
      })
    })
  })

  describe('appendTo', function () {
    it('should append element to node', function () {
      var el = create(1)
      var node = create()
      node.appendChild(domify('<div>'))
      _(el).appendTo(node)
      assert.equal(node.lastChild.textContent, '1')
    })

    it('should append elements to node', function () {
      var els = createNodes(3)
      var node = create()
      node.appendChild(domify('<div>'))
      _(els).appendTo(node)
      assert.equal(node.textContent, '123')
    })
  })

  describe('prepend', function () {
    it('should prepent element to node', function () {
      var el = create()
      el.appendChild(create(3))
      _(el).prepend(create(2))
      _(el).prepend(create(1))
      assert.equal(el.textContent, '123')
    })

    it('should prepend element even if node empty', function () {
      var el = create()
      _(el).prepend(create(1))
      assert.equal(el.textContent, '1')
    })
  })

  describe('prependTo', function() {
    it('should prepend to element', function () {
      var el = create()
      el.appendChild(create(2))
      var node = create(1)
      _(node).prependTo(el)
      assert.equal(el.textContent, '12')
    })

    it('should prepend to empty element', function () {
      var el = create()
      var node = create(1)
      _(node).prependTo(el)
      assert.equal(el.textContent, '1')
    })
  })

  describe('attr', function() {
    it('should set the attribute to el', function() {
      var el = create()
      _(el).attr({
        a: '1',
        b: '2'
      })
      assert.equal(el.getAttribute('a'), '1')
      assert.equal(el.getAttribute('b'), '2')
    })

    it('should set the attribute to els', function() {
      var els = createNodes(3)
      _(els).attr({
        a: '1',
        b: '2'
      })
      els.forEach(function(el) {
        assert.equal(el.getAttribute('a'), '1')
        assert.equal(el.getAttribute('b'), '2')
      })
    })

  })

  describe('style', function() {
    it('should set style to el', function () {
      var el = create()
      _(el).style({
        height: '100px',
        width: '200px'
      })
      assert.equal(el.style.height, '100px')
      assert.equal(el.style.width, '200px')
    })

    it('should set style to els', function () {
      var els = createNodes(3)
      _(els).style({
        height: '100px',
        width: '200px'
      })
      els.forEach(function(el) {
        assert.equal(el.style.height, '100px')
        assert.equal(el.style.width, '200px')
      })
    })
  })

  describe('parent', function() {
    it('should get the parent', function() {
      var el = create()
      var p = _(el).parent()
      assert.equal(el.parentNode, p)
    })

    it('should get the parent by selector', function() {
      var p1 = create(1)
      p1.className = 'foo'
      var p2 = create(2, p1)
      var el = create(3, p2)
      var p = _(el).parent('.foo')
      assert(p === p1)
    })
  })

  describe('parents', function() {
    it('should get the parents', function () {
      var p1 = create(1)
      var p2 = create(2, p1)
      var el = create(3, p2)
      var ps = _(el).parents()
      assert.deepEqual(ps, [p2, p1, document.body, document.lastChild])
    })
  })

  describe('children', function() {
    it('should get all the children', function () {
      var el = create()
      createNodes(3, el)
      var children = _(el).children()
      var html = toHtml(children)
      assert.equal(html, '123')
    })

    it('should get all the children by selector', function () {
      var el = create()
      createNodes(3, el)
      var children = _(el).children(':first-child')
      var html = toHtml(children)
      assert.equal(html, '1')
    })
  })

  describe('prev', function () {
    it('should get previous node', function () {
      var el = create()
      var els = createNodes(3, el)
      var prev = _(els[1]).prev()
      assert.equal(prev, els[0])
    })

    it('should get previous node by selector', function () {
      var el = create()
      var els = createNodes(3, el)
      var prev = _(els[2]).prev(':first-child')
      assert.equal(prev, els[0])
    })
  })

  describe('next', function() {
    it('should get next node', function() {
      var el = create()
      var els = createNodes(3, el)
      var next = _(els[1]).next()
      assert.equal(next, els[2])
    })

    it('should get next node by selector', function() {
      var el = create()
      var els = createNodes(3, el)
      var next = _(els[0]).next(':last-child')
      assert.equal(next, els[2])
    })
  })

  describe('prevAll', function () {
    it('should get previous nodes', function () {
      var el = create()
      var els = createNodes(3, el)
      var prevs = _(els[2]).prevAll()
      assert.deepEqual(prevs, [els[1], els[0]])
    })

    it('should get previous node by selector', function () {
      var el = create()
      var els = createNodes(3, el)
      var prevs = _(els[2]).prevAll(':first-child')
      assert.deepEqual(prevs, [els[0]])
    })
  })

  describe('nextAll', function() {
    it('should get next nodes', function() {
      var el = create()
      var els = createNodes(3, el)
      var next = _(els[0]).nextAll()
      assert.deepEqual(next, [els[1], els[2]])
    })

    it('should get next nodes by selector', function() {
      var el = create()
      var els = createNodes(3, el)
      var next = _(els[0]).nextAll(':last-child')
      assert.deepEqual(next, [els[2]])
    })
  })

  describe('each', function() {
    it('should iterate nodes', function () {
      var els = createNodes(3)
      var str = ''
      _(els).each(function(el) {
        str = str + el.textContent
      })
      assert.equal(str, '123')
    })
  })
})

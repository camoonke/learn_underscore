var _ = require('../../');

describe('test/object.test.js', function () {
  it('#keys', function () {
    _.keys({one: 1, two: 2, three: 3})
      .should.eql(["one", "two", "three"])
  })

  it('#allKeys', function () {
    function Stooge(name) {
      this.name = name;
    }
    Stooge.prototype.silly = true;
    _.allKeys(new Stooge("Moe"))
      .should.eql(["name", "silly"])
  })

  it('#values', function () {
    _.values({one: 1, two: 2, three: 3})
      .should.eql([1, 2, 3])
  })

  it('#mapObject', function () {
    var t = _.mapObject({start: 5, end: 12}, function(val, key) {
      return val + 5;
    });
    t.should.eql({start: 10, end: 17})
  })

  it('#pairs', function () {
    _.pairs({one: 1, two: 2, three: 3})
      .should.eql([["one", 1], ["two", 2], ["three", 3]])
  })

  it('#invert', function () {
    _.invert({Moe: "Moses", Larry: "Louis", Curly: "Jerome"})
      .should.eql({Moses: "Moe", Louis: "Larry", Jerome: "Curly"})
  })

  it('#create', function () {
    function Proto () {}
    Proto.prototype = {
      name: 'test'
    }
    var ret = _.create(Proto.prototype, {Larry: 'louis'})
    ret.name.should.eql('test')
    ret.Larry.should.eql('louis')
  })

  it('#functions', function () {
    var obj = {
      a: function () {},
      b: function () {},
      c: 1
    }
    _.functions(obj).should.eql(['a', 'b'])
  })

  it('#findKey', function () {
    var obj = {
      a: 1,
      b: 2
    }
    function predicate (v, i) {
      if(v === 1) return true
      return false
    }
    _.findKey(obj, predicate).should.eql('a')
  })

  it('#extendOwn', function () {
    var t = {name: 'moe'}
    _.extendOwn(t, {age: 50})
      .should.eql({name: 'moe', age: 50})
  })

  it('#pick', function () {
    var testObj = {name: 'moe', age: 50, userid: 'moe1'}
    _.pick(testObj, 'name', 'age')
      .should.eql({name: 'moe', age: 50})

    function predicate (v, i, obj) {
      return v === 'moe'
    }
    _.pick(testObj, predicate)
      .should.eql({name: 'moe'})
  })

  it('#omit', function () {
    var testObj = {name: 'moe', age: 50, userid: 'moe1'}
    _.omit(testObj, 'name', 'age')
      .should.eql({userid: 'moe1'})

    function predicate (v, i, obj) {
      return v === 'moe'
    }
    _.omit(testObj, predicate)
      .should.eql({age: 50, userid: 'moe1'})
  })

  it('#defaults', function () {
    var iceCream = {flavor: "chocolate"};
    _.defaults(iceCream, {flavor: "vanilla", sprinkles: "lots"})
      .should.eql({flavor: "chocolate", sprinkles: "lots"})
  })

  it('#clone', function () {
    var o = {name: 'moe'}
    _.clone(o).should.eql({name: 'moe'})
  })
})

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

  it('#tap', function () {
    var o = {name: 'moe'}
    _.tap(o, function (obj) {
      obj.count = 1
    })
    o.should.eql({name: 'moe', count: 1})
  })

  it('#has', function () {
    _.has({a: 1, b: 2, c: 3}, "b")
      .should.eql(true)
  })

  it('#property', function () {
    var stooge = {name: 'moe'};
    _.property('name')(stooge).should.eql('moe')
  })

  it('#propertyOf', function () {
    var stooge = {name: 'moe'};
    _.propertyOf(stooge)('name').should.eql('moe')
  })

  it('#isMatch', function () {
    var stooge = {name: 'moe', age: 32};
    _.isMatch(stooge, {age: 32}) 
      .should.eql(true)

    _.isMatch(stooge, {age: 31})
      .should.eql(false)
  })

  it('#isEmpty', function () {
    _.isEmpty([1, 2, 3])
      .should.eql(false)

    _.isEmpty({})
      .should.eql(true)

    _.isEmpty({a: 1})
      .should.eql(false)

    _.isEmpty([])
      .should.eql(true)
  })

  it('#isElement', function () {
    // no jquery
  })

  it('#isArray', function () {
    _.isArray({}).should.eql(false)
    _.isArray([]).should.eql(true)
  })

  it('#isObject', function () {
    _.isObject({}).should.eql(true)
    _.isObject([]).should.eql(true)
    _.isObject(function () {}).should.eql(true)
    _.isObject('a').should.eql(false)
    _.isObject(1).should.eql(false)
  })

  it('#isArguments', function () {
    (function(){ return _.isArguments(arguments); })(1, 2, 3)
      .should.eql(true)
    _.isArguments([1, 2, 3]).should.eql(false)
  })

  it('#isFunction', function () {
    _.isFunction(function() {}).should.eql(true)
  })

  it('#isString', function () {
    _.isString("moe").should.eql(true)
    _.isString(1).should.eql(false)
  })

  it('#isNumber', function () {
    _.isNumber("moe").should.eql(false)
    _.isNumber(1).should.eql(true)
  })

  it('#isDate', function () {
    _.isDate("moe").should.eql(false)
    _.isDate(1).should.eql(false)
    _.isDate(new Date).should.eql(true)
  })

  it('#isRegExp', function () {
    _.isRegExp("moe").should.eql(false)
    _.isRegExp(1).should.eql(false)
    _.isRegExp(new Date).should.eql(false)
    _.isRegExp(/t/).should.eql(true)
  })

  it('#isError', function () {
    try {
      throw new TypeError("Example");
    } catch (o_O) {
      _.isError(o_O).should.eql(true)
    }
  })

  it('#isError', function () {
    try {
      throw new TypeError("Example");
    } catch (o_O) {
      _.isError(o_O).should.eql(true)
    }
  })

  it('#isFinite', function () {
    _.isFinite(-101).should.eql(true)
    _.isFinite(-Infinity).should.eql(false)
  })

  it('#isBoolean', function () {
    _.isBoolean(true).should.eql(true)
    _.isBoolean(false).should.eql(true)
    _.isBoolean(Boolean(1)).should.eql(true)
    _.isBoolean(null).should.eql(false)
  })

  it('#isNaN', function () {
    _.isNaN(NaN).should.eql(true)
    _.isNaN(undefined).should.eql(false)
    isNaN(undefined).should.eql(true)
    _.isNaN(1).should.eql(false)
  })

  it('#isNull', function () {
    _.isNull(null).should.eql(true)
    _.isNull(undefined).should.eql(false)
  })

  it('#isUndefined', function () {
    var a
    _.isUndefined(a).should.eql(true)
  })
})

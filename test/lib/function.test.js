var _ = require('../../');

describe('test/function.test.js', function () {
  it('#bind', function () {
    function func (greeting){
      return greeting + ': ' + this.name
    };
    _.bind(func, {name: 'moe'}, 'hi').should.eql('hi: moe')
  })

  it('#bindAll', function () {
    it('should bind all methods', function () {
      var obj = {
        name: 'test',
        fn1: function () {
          return this.name
        },
        fn2: function () {
          return this.name
        }
      }

      var fn1 = obj.fn1;

      'test'.should.not.eql(fn1())

      _.bindAll(obj)

      var fn1 = obj.fn1;
      var fn2 = obj.fn2;

      fn1().should.eql('test')
      fn2().should.eql('test')

    })

    it('should bind specified methods', function () {
      var obj = {
        name: 'test',
        fn1: function () {
          return this.name
        },
        fn2: function () {
          return this.name
        }
      }

      _.bindAll(obj, 'fn1')

      var fn1 = obj.fn1;
      var fn2 = obj.fn2;

      fn1().should.eql('test')
      'test'.should.not.eql(fn2())
    })
  })

  it('#partial', function () {
    var subtract = function(a, b) { return b - a; }
    sub5 = _.partial(subtract, 5)
    sub5(20).should.eql(15)

    subFrom20 = _.partial(subtract, _, 20)
    subFrom20(5).should.eql(15)
  })

  it('#memoize', function () {
    var m = _.memoize(function (a, b) {
      return a + b;
    })
    m(1, 2).should.eql(3);
    ('1' in m.cache).should.true()

    var m1 = _.memoize(function (a, b) {
      return a + b;
    }, function () {
      return 10
    })
    m1(1, 2).should.eql(3);
    ('10' in m1.cache).should.true()

    var fibonacci = _.memoize(function(n) {
      return n < 2 ? n: fibonacci(n - 1) + fibonacci(n - 2);
    });
    fibonacci(1000) // should fast
  })

  it('#delay', function () {
    var a = 0
    var func = function (b) {
      a = a + b
    };
    a.should.eql(0)
    _.delay(func, 30, 10);

    setTimeout(function () {
      a.should.eql(10)
    }, 50)
  })

  it('#defer', function () {
    var a = 0
    var func = function (b) {
      a = a + b
    };
    a.should.eql(0)
    _.defer(func, 10);

    setTimeout(function () {
      a.should.eql(10)
    }, 50)
  })
})  
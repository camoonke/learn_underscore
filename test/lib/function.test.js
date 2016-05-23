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
})  
var _ = require('../../');

describe('test/utility.test.js', function () {
  it('#identity', function () {
    var stooge = {name: 'moe'};
    _.identity(stooge).should.eql(stooge)
  })

  it('#constant', function () {
    var stooge = {name: 'moe'};
    _.constant(stooge)().should.eql(stooge)
  })

  it('#noop', function () {
    (_.noop() === void 0).should.true()
  })

  it('#times', function () {
    _.times(3, function(n) {return n;})
      .should.eql([0, 1, 2])
  })

  it('#random', function () {
    function cover(fn, range) {
      var obj = {};

      range.forEach(function (num) {
        obj[num] = false;
      })

      for (var i = 0; i < 100000; i++) {
        obj[fn()] = true;
      }

      for (var k in obj) {
        obj[k].should.true()
      }

      Object.keys(obj).length.should.eql(range.length)
    }
    
    it('_.random(5)', function () {
      cover(function () {
        return _.random(5)
      }, [0, 1, 2, 3, 4, 5])
    })

    it('_.random(1, 5)', function () {
      cover(function () {
        return _.random(1, 5)
      }, [1, 2, 3, 4, 5])
    })

    it('_.random(4, 5)', function () {
      cover(function () {
        return _.random(4, 5)
      }, [4, 5])
    })
  })

  it('#uniqueId', function () {
    _.uniqueId().should.eql('1')
    _.uniqueId().should.eql('2')
    _.uniqueId('hello').should.eql('hello3')
    _.uniqueId().should.eql('4')
    _.uniqueId('world').should.eql('world5')
  })

  it('#escape', function () {
    _.escape('Curly, Larry & "Moe"')
      .should.eql('Curly, Larry &amp; &quot;Moe&quot;')
  })

  it('#unescape', function () {
    _.unescape('Curly, Larry &amp; &quot;Moe&quot;')
      .should.eql('Curly, Larry & "Moe"')
  })

  it('#result', function () {
    var object = {cheese: 'crumpets', stuff: function(){ return 'nonsense'; }};
    _.result(object, 'cheese').should.eql('crumpets')
    _.result(object, 'stuff').should.eql('nonsense')
    _.result(object, 'meat', 'ham').should.eql('ham')
    _.result(object, 'meat', function () { return 'ham'}).should.eql('ham')
  })
})

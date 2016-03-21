var _ = require('../../');

describe('test/collection.test.js', function () {
  it('#each', function () {
    var arr = [1, 2, 3]
    var str = ''
    _.each(arr, function (e, i, arr) {
      str += i + '' + e + ':'
    })
    str.should.eql('01:12:23:')

    str = ''
    var obj = {one: 1, two: 2, three: 3}
    _.each(obj, function (e, i, obj) {
      str += i + '' + e + ':'
    })
    str.should.eql('one1:two2:three3:')
  })

  it('#map', function () {
    _.map([1, 2, 3], function(num){
        return num * 3;
    }).should.eql([3, 6, 9])

    _.map({one: 1, two: 2, three: 3}, function(num, key){ 
      return num * 3; 
    }).should.eql([3, 6, 9])
  })

  it('#reduce', function () {
    _.reduce([1, 2, 3], function(memo, num){
      return memo + num;
    }, 0).should.eql(6)

    _.reduce([1, 2, 3], function(memo, num){
      return memo + num;
    }, 2).should.eql(8)
  })

  it('#reduceRight', function () {
    var list = [[0, 1], [2, 3], [4, 5]];
    var flat = _.reduceRight(list, function(a, b) {
      return a.concat(b); 
    }, [])
    flat.should.eql([4, 5, 2, 3, 0, 1])
  })

  it('#find', function () {
    _.find([1, 2, 3, 4, 5, 6], function(num){
      return num % 2 == 0;
    }).should.eql(2)
  })

  it('#filter', function () {
    _.filter([1, 2, 3, 4, 5, 6], function(num){
      return num % 2 == 0;
    }).should.eql([2, 4, 6])
  })

  it('#where', function () {
    var listOfPlays = [{title: "Cymbeline"}, {title: "The Tempest"}]
    _.where(listOfPlays, {
        author: "Shakespeare",
        year: 1611
    }).should.eql([
      {title: "Cymbeline",
      author: "Shakespeare",
      year: 1611},
      {title: "The Tempest",
      author: "Shakespeare",
      year: 1611
    }])
  })

  it('#findWhere', function () {
    var publicServicePulitzers = [{year: 1918, newsroom: "The New York Times",reason: "For its public service in publishing in full so many official reports,documents and speeches by European statesmen relating to the progress andconduct of the war."}]
    _.findWhere(publicServicePulitzers, {newsroom: "The New York Times"}).should.eql(publicServicePulitzers[0])
  })

  it('#reject', function () {
    _.reject([1, 2, 3, 4, 5, 6], function(num){
      return num % 2 == 0;
    }).should.eql([1, 3, 5])
  })

  it('#every', function () {
    _.every([2, 4, 5], function(num) {
      return num % 2 == 0;
    }).should.eql(false)
  })

  it('#some', function () {
    _.some([null, 0, 'yes', false])
      .should.eql(true)
  })

  it('#contains', function () {
    _.contains([1, 2, 3], 3)
      .should.eql(true)

    _.contains([{
        x: 1,
        y: 2
      }, {
        x: 0,
        y: 1
      }], {x: 1, y: 2})
      .should.eql(true)
  })

  it('#invoke', function () {
    _.invoke([[5, 1, 7], [3, 2, 1]], 'sort')
      .should.eql([[1, 5, 7], [1, 2, 3]])

    _.invoke([[5, 1, 7], [3, 2, 1]], function () {
      return !!~this.indexOf(5)
    }).should.eql([true, false])
  })

  it('#pluck', function () {
    var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
    _.pluck(stooges, 'name')
      .should.eql(["moe", "larry", "curly"])
  })

  it('#max', function () {
    var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
    _.max(stooges, function(stooge){
        return stooge.age; 
    }).should.eql({name: 'curly', age: 60})

    _.max([1, 2, 3]).should.eql(3)
  })

  it('#max', function () {
    var numbers = [10, 5, 100, 2, 1000];
    _.min(numbers).should.eql(2)
  })

  it('#sortBy', function () {
    _.sortBy([1, 2, 3, 4, 5, 6], function(num){
      return Math.sin(num);
    }).should.eql([5, 4, 6, 3, 1, 2])

    var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
    _.sortBy(stooges, 'name')
      .should.eql([{name: 'curly', age: 60}, {name: 'larry', age: 50}, {name: 'moe', age: 40}])
  })

  it('#groupBy', function () {
    _.groupBy([1.3, 2.1, 2.4], function(num){ 
      return Math.floor(num);
    }).should.eql({1: [1.3], 2: [2.1, 2.4]})

    _.groupBy(['one', 'two', 'three'], 'length')
      .should.eql({3: ["one", "two"], 5: ["three"]})
  })

  it('#indexBy', function () {
   var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}]
   _.indexBy(stooges, 'age')
    .should.eql({
      "40": {name: 'moe', age: 40},
      "50": {name: 'larry', age: 50},
      "60": {name: 'curly', age: 60}
    })
  })

  it('#countBy', function () {
   _.countBy([1, 2, 3, 4, 5], function(num) {
      return num % 2 == 0 ? 'even': 'odd';
    }).should.eql({odd: 3, even: 2})
  })
})

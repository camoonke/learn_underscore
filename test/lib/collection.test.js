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
    _.reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }).should.eql([1, 3, 5])
  })

})

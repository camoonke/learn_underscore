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
      console.log(e, i, obj)
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

  
})

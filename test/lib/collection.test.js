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
})

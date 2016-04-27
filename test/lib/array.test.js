var _ = require('../../');

describe('test/array.test.js', function () {
  it('#first', function () {
    _.first([5, 4, 3, 2, 1]).should.eql(5)
    _.first([5, 4, 3, 2, 1], 2).should.eql([5, 4])
  })

  it('#initial', function () {
    _.initial([5, 4, 3, 2, 1]).should.eql([5, 4, 3, 2])
    _.initial([5, 4, 3, 2, 1], 2).should.eql([5, 4, 3])
  })

  it('#last', function () {
    _.last([5, 4, 3, 2, 1]).should.eql(1)
    _.last([5, 4, 3, 2, 1], 2).should.eql([2, 1])
  })

  it('#rest', function () {
    _.rest([5, 4, 3, 2, 1]).should.eql([4, 3, 2, 1])
    _.rest([5, 4, 3, 2, 1], 2).should.eql([3, 2, 1])
  })

  it('#compact', function () {
    _.compact([0, 1, false, 2, '', 3]).should.eql([1, 2, 3])
  })

  it('#flatten', function () {
    _.flatten([1, [2], [3, [[4]]]]).should.eql([1, 2, 3, 4])
    _.flatten([1, [2], [3, [[4]]]], true).should.eql([1, 2, 3, [[4]]])
  })

})
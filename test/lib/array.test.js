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

  it('#difference', function () {
    _.difference([1, 2, 3, 4, 5], [5, 2, 10]).should.eql([1, 3, 4])
  })

  it('#without', function () {
    _.without([1, 2, 1, 0, 3, 1, 4], 0, 1).should.eql([2, 3, 4])
  })

  it('#uniq', function () {
    _.uniq([1, 2, 1, 3, 1, 4]).should.eql([1, 2, 3, 4]) 
    _.uniq([1, 2, 3, 3, 4, 4, 5], true).should.eql([1, 2, 3, 4, 5])
  })
  
  it('#union', function () {
    _.union([1, 2, 3], [101, 2, 1, 10], [2, 1]).should.eql([1, 2, 3, 101, 10])
  })

  it('#intersection', function () {
    _.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]).should.eql([1, 2])
  })

  it('#unzip', function () {
    _.unzip([['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]]).should.eql([["moe", 30, true], ["larry", 40, false], ["curly", 50, false]])
  })

  it('#zip', function () {
    _.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]).should.eql([["moe", 30, true], ["larry", 40, false], ["curly", 50, false]])
  })

  it('#object', function () {
    _.object(['moe', 'larry', 'curly'], [30, 40, 50]).should.eql({moe: 30, larry: 40, curly: 50})
    _.object([['moe', 30], ['larry', 40], ['curly', 50]]).should.eql({moe: 30, larry: 40, curly: 50})
  })

  it('#indexOf', function () {
    _.indexOf([1, 2, 3], 2).should.eql(1)
  })

  it('#lastIndexOf', function () {
    _.lastIndexOf([1, 2, 3, 1, 2, 3], 2).should.eql(4)
  })

  it('#sortedIndex', function () {
    _.sortedIndex([10, 20, 30, 40, 50], 35).should.eql(3)
    var stooges = [{name: 'moe', age: 40}, {name: 'curly', age: 60}];
    _.sortedIndex(stooges, {name: 'larry', age: 50}, 'age').should.eql(1)
  })

  it('#findIndex', function () {
    _.findIndex([4, 6, 8, 12], function(v) {
      return v % 2 === 0
    }).should.eql(0)
  })

  it('#findLastIndex', function () {
    _.findLastIndex([4, 6, 8, 12], function(v) {
      return v % 2 === 0
    }).should.eql(3)
  })

  it('#range', function () {
    _.range(10).should.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    _.range(1, 11).should.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    _.range(0, 30, 5).should.eql([0, 5, 10, 15, 20, 25])
    _.range(0, -10, -1).should.eql([0, -1, -2, -3, -4, -5, -6, -7, -8, -9])
    _.range(0).should.eql([])
  })
})  
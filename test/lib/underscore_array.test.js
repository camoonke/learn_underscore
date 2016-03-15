var _ = require('../../');

describe('test/lodash_array.test.js', function () {
  describe('Arrays', function () {
    describe('#chunk', function () {
      it('_.chunk(arr, 2)', function () {
        var arr = ['a', 'b', 'c', 'd', 'e', 'f']
        _.chunk(arr, 2).should.eql([['a', 'b'], ['c', 'd'], ['e', 'f']])
      })
    })
  })
  
})

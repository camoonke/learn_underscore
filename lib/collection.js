var tools = require('./tools')

function createReduce(dir) {
  return function (list, iteratee, memo, context) {
    if(!memo) {
      memo = 0
    }
    var keys = !tools.isArrayLike(list) && tools.keys(list),
        length = (keys || list).length,
        i = dir > 0 ? 0 : length - 1
    for(; i>=0 && i<length; i=i+dir) {
      var currentKey = keys ? keys[i] : i
      memo = iteratee(memo, list[currentKey])
    }
    return memo
  }
}

exports.each = exports.forEach = function (list, iteratee, context) {
  iteratee = tools.optimizeCb(iteratee, context)
  var keys = !tools.isArrayLike(list) && tools.keys(list),
      length = (keys || list).length,
      i
  for(i=0; i<length; ++i) {
    var currentKey = keys ? keys[i] : i
    iteratee(list[currentKey], currentKey, list)
  }
  return list
}

exports.map = exports.collect = function (list, iteratee, context) {
  iteratee = tools.optimizeCb(iteratee, context)
  var keys = !tools.isArrayLike(list) && tools.keys(list),
      length = (keys || list).length,
      results = Array(length),
      i
  for(i=0; i<length; ++i) {
    var currentKey = keys ? keys[i] : i
    results[i] = iteratee(list[currentKey], currentKey, list)
  }
  return results
} 

exports.reduce = exports.inject = exports.foldl = createReduce(1)

exports.reduceRight = exports.foldr = createReduce(-1)
var tools = require('./tools')

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
var tools = require('./tools')

exports.each = exports.forEach = function (list, iteratee, context) {
  iteratee = tools.optimizeCb(iteratee, context)
  var i, iLength
  if(tools.isArrayLike(list)) {
    for(i=0, iLength=list.length; i<iLength; ++i) {
      iteratee(list[i], i, list)
    }
  } else {
    var keys = tools.keys(list)
    for(i=0, iLength=keys.length; i<iLength; ++i) {
      iteratee(list[keys[i]], keys[i], list)
    }
  }
  return list
}
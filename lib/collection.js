var tools = require('./tools')

function createReduce(dir) {
  return function (list, iteratee, memo, context) {
    if(!memo) {
      memo = 0
    }
    iteratee = tools.cb(iteratee, context)
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

exports.find = exports.detect = function (list, predicate, context) {
  var key
  if(tools.isArrayLike(list)) {
    key = tools.createPredicateIndexFinder(1)(list, predicate, context)
  } else {
    key = tools.findKey(list)(list, predicate, context)
  }
  return key !== -1 && key !== void 0 ? list[key] : void 0
}

exports.filter = exports.select = function (list, predicate, context) {
  predicate = tools.cb(predicate, context)
  var keys = !tools.isArrayLike(list) && tools.keys(list),
      length = (keys || list).length,
      results = [],
      i
  for(i=0; i<length; ++i) {
    var v = list[keys ? keys[i] : i]
    if(predicate(v)) {
      results.push(v)
    }
  }
  return results
}

exports.where = function (list, properties) {
  if(!tools.isArrayLike(list)) return []

  var keys = tools.keys(properties)
  for(var i=0, iLength=list.length; i<iLength; ++i) {
    for(var j=0, jLength=keys.length; j<jLength; ++j) {
      var k = keys[j]
      list[i][k] = properties[k]
    }
  }
  return list
}
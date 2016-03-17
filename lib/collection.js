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

function map (list, iteratee, context) {
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
exports.map = exports.collect = map

exports.reduce = exports.inject = exports.foldl = createReduce(1)

exports.reduceRight = exports.foldr = createReduce(-1)

function find(list, predicate, context) {
  var key
  if(tools.isArrayLike(list)) {
    key = tools.createPredicateIndexFinder(1)(list, predicate, context)
  } else {
    key = tools.findKey(list)(list, predicate, context)
  }
  return key !== -1 && key !== void 0 ? list[key] : void 0
}
exports.find = exports.detect = find

function filter (list, predicate, context) {
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
exports.filter = exports.select = filter

exports.where = function (list, properties) {
  if(!tools.isArrayLike(list)) return []

  for(var i=0, iLength=list.length; i<iLength; ++i) {
    tools.createAssigner(tools.keys)(list[i], properties)
  }
  return list
}

exports.findWhere = function (list, properties) {
  if(!tools.isArrayLike(list) || !list.length) return void 0
  return find(list, tools.matcher(properties))
}

exports.reject = function (list, predicate, context) {
  return filter(list, tools.negate(predicate), context)
}

exports.every = exports.all = function (list, predicate, context) {
  predicate = tools.fixPredicate(predicate)
  predicate = tools.cb(predicate, context)
  var keys = !tools.isArrayLike(list) && tools.keys(list),
      length = (keys || list).length,
      results = [],
      i
  for(i=0; i<length; ++i) {
    var v = list[keys ? keys[i] : i]
    if(!predicate(v)) {
      return false
    }
  }
  return true
}

exports.some = exports.any = function (list, predicate, context) {
  predicate = tools.fixPredicate(predicate)
  return find(list, predicate, context) !== void 0
}

exports.contains = exports.include = function (list, value) {
  if(!tools.isObject(value)) {
    if(Array.isArray(list)) return !!~list.indexOf(value)
  } else {
    var predicate = tools.matcher(value)
    return find(list, predicate) !== void 0
  }
  return false
}

exports.invoke = function (list, method) {
  var args = tools.slice(arguments, 2),
      isFunc = tools.isFunction(method)
  return map(list, function (value) {
    var func = isFunc ? method : value[method]
    return func == null ? func : func.apply(value, args)
  })
}

exports.pluck = function (list, prop) {
  return map(list, tools.property(prop))
}
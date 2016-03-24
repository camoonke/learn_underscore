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

function each (list, iteratee, context) {
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
exports.each = exports.forEach = each

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

exports.filter = exports.select = tools.filter

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
  return tools.filter(list, tools.negate(predicate), context)
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

exports.max = function (list, iteratee, context) {
  var max = -Infinity,
      computeList = -Infinity
  if(!tools.isArrayLike(list)) return max

  if(!iteratee) {
    iteratee = function (v) {
      return v
    }
  }
  iteratee = tools.cb(iteratee, context)
  for(var i=0, iLength=list.length; i<iLength; ++i) {
    var p = list[i]
    var pValue = iteratee(list[i])
    if(pValue > max) {
      max = pValue
      computeList = p
    }    
  }
  return computeList
}

exports.min = function (list, iteratee, context) {
  var min = Infinity,
      computeList = Infinity
  if(!tools.isArrayLike(list)) return min

  if(!iteratee) {
    iteratee = tools.identity
  }
  iteratee = tools.cb(iteratee, context)
  for(var i=0, iLength=list.length; i<iLength; ++i) {
    var p = list[i]
    var pValue = iteratee(list[i])
    if(pValue < min) {
      min = pValue
      computeList = p
    }    
  }
  return computeList
}

exports.sortBy = function (list, iteratee, context) {
  var expression
  if(typeof iteratee === 'string') {
    expression = function (a, b) {
      return a[iteratee] > b[iteratee]
    }
  } else if (typeof iteratee === 'function') {
    iteratee = tools.cb(iteratee, context)
    expression = function (a, b) {
      return iteratee(a) > iteratee(b)
    }
  } else return list

  return list.sort(expression)
}

function group (behavior) {
  return function(list, iteratee, context) {
    var expression
    var obj = {}
    if(typeof iteratee === 'string') {
      expression = function (v) {
        return v[iteratee]
      }
    } else {
      expression = iteratee
    }
    each(list, function (e, i, list) {
      var key = expression(e)
      behavior(obj, e, key)
    }, context)
    return obj
  }
}
exports.groupBy = group (function (obj, e, key) {
  if(tools.has(obj, key)) {
    obj[key].push(e)
  } else {
    obj[key] = [e]
  }
})

exports.indexBy = group(function (obj, e, key) {
    obj[key] = e
})

exports.countBy = group(function (obj, e, key) {
  if(tools.has(obj, key)) {
    obj[key]++
  } else {
    obj[key] = 1
  }
})

exports.toArray = function (list) {
  if(!list) return []
  if(Array.isArray(list)) return Array.prototype.slice.call(list)
  if(tools.isArrayLike(list)) return map(list, tools.identity)
  return tools.objValue(list)
}

exports.size = function (list) {
  if(!list) return 0
  if(tools.isArrayLike(list)) return list.length
  return tools.keys(list).length
}

exports.partition = function (array, predicate) {
  var keys = !tools.isArrayLike(array) && tools.keys(array),
      length = (keys || array).length,
      i = 0,
      left = [],
      right = []

  for(; i<length; i++) {
    var v = array[keys ? keys[i] : i]
    if(predicate(v)) {
      left.push(v)
    } else {
      right.push(v)
    }
  }
  return [left, right]
}
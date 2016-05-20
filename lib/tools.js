var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1
var getLength = property('length')

function property (key) {
  return function (obj) {
    return obj == null ? void 0 : obj[key]
  }
}

function isArrayLike (collection) {
  var length = getLength(collection)
  return typeof length === 'number' && length >= 1 && length <= MAX_ARRAY_INDEX
}

function optimizeCb (func, context) {
  return function (value, index, collection) {
    return func.call(context, value, index, collection)
  }
}

function has(obj, key) {
  return obj !== null && Object.hasOwnProperty.call(obj, key)
}

function keys (obj) {
  if(!isObject(obj)) return []

  var ret = [], prop
  for(var prop in obj) {
    if(has(obj, prop)) {
      ret.push(prop)
    }
  }
  return ret
}

function isObject (obj) {
  var type = typeof(obj)
  return type === 'function' || type === 'object' && !!obj
}

function createPredicateIndexFinder (dir) {
  return function (array, predicate, context) {
    predicate = cb(predicate, context)
    var length = array.length,
        index = dir > 0 ? 0 : length - 1
    for(; index>=0 && index<length; index+=dir) {
      if(predicate(array[index])) return index
    }
    return -1
  }
}

function findKey (object, predicate, context) {
  if(!isObject(object)) return []
  predicate = cb(predicate, context)
  var keys = keys(object)
  for(var i=0, iLength=keys.length; i<iLength; i++) {
    var k = keys[i]
    if(predicate(object[k])) return k
  }
  return void 0
}

function cb (func, context) {
  if(context === void 0) return func
  return function () {
    return func.apply(context, arguments)
  }
}

// @param undefinedOnly 表示当对象属性值为void 0时，是否继续复制
function createAssigner (keyFunc, undefinedOnly) {
  return function (des) {
    var length = arguments.length
    if(length < 2 || des == null) return des 

    for(var i=1; i<length; ++i) {
      var source = arguments[i],
          keys = keyFunc(source)
      for(var j=0, jLength=keys.length; j<jLength; ++j) {
        var prop = keys[j]
        if(!undefinedOnly || obj[key] === void 0) {
          des[prop] = source[prop]
        }
      }
    }
  }
}

function matcher (attrs) {
  return function (obj) {
    var sourKey = keys(attrs)
    for(var i=0, iLength=sourKey.length; i<iLength; ++i) {
      var key = sourKey[i],
          hasKey = has(obj, key)
      if(!hasKey || (hasKey && attrs[key] !== obj[key])) {
        return false
      }
    }
    return true
  }
}

function negate (predicate) {
  return function () {
    return !predicate.apply(this, arguments)
  }
}

function fixPredicate (predicate) {
  if(predicate) return predicate
  return function (v) {
    return !!v
  }
}

function slice(obj, start, end) {
  return Array.prototype.slice.call(obj, start, end);
}

function isFunction (func) {
  return typeof func === 'function'
}

function identity (v) {
  return v
}

function objValue (obj) {
  if(!isObject(obj)) return []

  var ret = [], prop
  for(var prop in obj) {
    if(has(obj, prop)) {
      ret.push(obj[prop])
    }
  }
  return ret
}

function filter (list, predicate, context) {
  predicate = cb(predicate, context)
  var keys = !isArrayLike(list) && keys(list),
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

function flatten (input, shallow, strict, startIndex) {
  var output = [], idx = 0 
  for(var i=startIndex || 0, iLength=getLength(input); i<iLength; ++i) {
    var value = input[i]
    if(isArrayLike(value) && Array.isArray(value)) {
      if(!shallow) value = flatten(value, shallow, strict)
      var j=0, len = getLength(value)
      while(j < len) {
        output[idx++] = value[j++]
      }
    } else if(!strict) {
      output[idx++] = input[i]
    }
  }
  return output
}

function uniq (array, isSorted) {
  var output = []
  for(var i=0, iLength=getLength(array); i<iLength; ++i) {
    var value = array[i]
    if(!isSorted) {
      if(!~output.indexOf(value)) {
        output.push(value)
      }
    } else {
      if(!i) {
        output.push(value)
        continue
      }
      if(value !== array[i - 1]) {
        output.push(value)
      }
    }
  }
  return output
}

exports.getLength = getLength
exports.property = property
exports.isArrayLike = isArrayLike
exports.optimizeCb = optimizeCb
exports.keys = keys
exports.isObject = isObject
exports.cb = cb
exports.createPredicateIndexFinder = createPredicateIndexFinder
exports.findKey = findKey
exports.has = has
exports.createAssigner = createAssigner
exports.matcher = matcher
exports.negate = negate
exports.fixPredicate = fixPredicate
exports.slice = slice
exports.isFunction = isFunction
exports.identity = identity
exports.objValue = objValue
exports.filter = filter
exports.flatten = flatten
exports.uniq = uniq
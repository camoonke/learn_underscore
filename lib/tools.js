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

function keys (obj) {
  if(!isObject(obj)) return []

  var ret = [], prop
  for(var prop in obj) {
    if(Object.hasOwnProperty.call(obj, prop)) {
      ret.push(prop)
    }
  }
  return ret
}

function isObject (obj) {
  var type = typeof(obj)
  return type === 'function' || type === 'object' && !!obj
}

exports.getLength = getLength
exports.property = property
exports.isArrayLike = isArrayLike
exports.optimizeCb = optimizeCb
exports.keys = keys
exports.isObject = isObject
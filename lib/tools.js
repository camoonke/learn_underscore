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

exports.getLength = getLength
exports.property = property
exports.isArrayLike = isArrayLike
exports.optimizeCb = optimizeCb
exports.keys = keys
exports.isObject = isObject
exports.cb = cb
exports.createPredicateIndexFinder = createPredicateIndexFinder
exports.findKey = findKey
var tools = require('./tools')

exports.keys = tools.keys

function allKeys (obj) {
  var result = []
  for(var i in obj) {
    result.push(i)
  }
  return result
}
exports.allKeys = allKeys

exports.values = function (obj) {
  var result = []
  for(var i in obj) {
    if(tools.has(obj, i)) {
      result.push(obj[i])
    }
  }
  return result
}

exports.mapObject = function (obj, iteratee, context) {
  var iteratee = tools.cb(iteratee)
  var keys = tools.keys(obj)
  var result = {}
  keys.forEach(function (e) {
    result[e] = iteratee(obj[e], e, obj)
  })
  return result
}

exports.pairs = function (obj) {
  var result = []
  for(var i in obj) {
    if(tools.has(obj, i)) {
      result.push([i, obj[i]])
    }
  }
  return result
}

exports.invert = function (obj) {
  var keys = tools.keys(obj)
  var result = {}
  keys.forEach(function (e) {
    result[obj[e]] = e
  })
  return result
}

exports.create = function (proto, props) {
  var Ctor = function () {}
  Ctor.prototype = proto
  var result = new Ctor
  var keys = tools.keys(props)
  keys.forEach(function (e) {
    result[e] = props[e]
  })
  return result
}

exports.functions = exports.methods = function (obj) {
  var keys = tools.keys(obj)
  var result = []
  keys.forEach(function (e) {
    if(tools.isFunction (obj[e])) {
      result.push(e)
    }
  })
  return result
}

exports.findKey = function (obj, predicate, context) {
  predicate = tools.cb(predicate, context)
  var keys = tools.keys(obj)
  for(var i=0, iLength=tools.getLength(keys); i<iLength; ++i) {
    var curKey = keys[i]
    if(predicate(obj[curKey], curKey, obj)) {
      return curKey
    }
  }
  return void 0
}

exports.extendOwn = function (dest) {
  var result = {}
  var args = tools.slice(arguments)
  for(var i=1, iLength=args.length; i<iLength; ++i) {
    var source = args[i]
    var keys = tools.keys(source)
    keys.forEach(function (e) {
      dest[e] = source[e]
    })
  }
  return dest
}

exports.pick = function (obj, oiteratee) {
  var iteratee, keys, result = {}
  if(!tools.isFunction(oiteratee)) {
    iteratee = function (v, i, obj) {
      return i in obj
    }
    keys = tools.slice(arguments, 1)
  } else {
    iteratee = oiteratee
    keys = allKeys(obj)
  }
  keys.forEach(function (e) {
    if(iteratee(obj[e], e, obj)) {
      result[e] = obj[e]
    }
  })
  return result
}

exports.omit = function (obj, oiteratee) {
  var iteratee, keys, result = {}
  keys = allKeys(obj)
  var oKeys = tools.slice(arguments, 1)
  if(!tools.isFunction(oiteratee)) {
    iteratee = function (v, i, obj) {
      return !~oKeys.indexOf(i) 
    }
  } else {
    iteratee = tools.negate(oiteratee)
  }
  keys.forEach(function (e) {
    if(iteratee(obj[e], e, obj)) {
      result[e] = obj[e]
    }
  })
  return result
}

exports.defaults = function (obj) {
  var args = tools.slice(arguments, 1)
  args.forEach(function (o) {
    for(var i in o) {
      if(tools.has(o, i) && obj[i] === void 0) {
        obj[i] = o[i]
      }
    }
  })
  return obj
}

exports.clone = function (obj) {
  var result = {}
  for(var i in obj) {
    result[i] = obj[i]
  }
  return result
}

exports.tap = function (obj, interceptor) {
  if(tools.notExist(interceptor)) return obj

  interceptor(obj)
  return obj
}

exports.has = tools.has

exports.property = tools.property

exports.propertyOf = function (obj) {
  return function (key) {
    return tools.has(obj, key) ? obj[key] : void 0
  }
}

// isEqual

function isMatch (obj, prop) {
  var keys = tools.keys(prop)
  if(obj === null) return void 0

  for(var i=0, iLength=keys.length; i<iLength; ++i) {
    var curKey = keys[i]
    if(!(curKey in obj) || (prop[curKey] !== obj[curKey])) return false
  }
  return true
}
exports.isMatch = isMatch

exports.matcher = function (attrs) {
  return function (obj) {
    return isMatch(obj, attrs)
  }
}

exports.isEmpty = function (obj) {
  if(tools.isArrayLike(obj)) {
    if(obj.length) return false
  } else {
    var keys = tools.keys(obj)
    if(keys.length) return false
  }
  return true
}

exports.isElement = function (obj) {
  return !!(obj && obj.nodeType === 1)
}

exports.isArray = function (obj) {
  return Array.isArray(obj)
}

exports.isObject = function (obj) {
  var type = typeof obj 
  return type === 'object' || type === 'function' && !!obj
}

var ex = exports;
['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'].forEach(function (e, i) {
  ex['is' + e] = function (obj) {
    return toString.call(obj) === '[object ' + e + ']' || false
  }
})

exports.isFinite = function (obj) {
  return isFinite(obj)
}

exports.isBoolean = function (obj) {
  return obj === true || obj === false || toString.call(obj) === '[object Boolean]'
}

exports.isNaN = function (obj) {
  if(obj === void 0) {
    return false 
  } else {
    return isNaN(obj)
  }
}

exports.isNull = function (obj) {
  return obj === null
} 

exports.isUndefined = function (obj) {
  return obj === void 0
}
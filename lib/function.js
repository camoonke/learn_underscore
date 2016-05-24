var tools = require('./tools')

function bind (func, object, partial) {
  if(tools.notExist(partial)) {
    partial = []
  } else {
    partial = tools.slice(arguments, 2)
  }
  return func.apply(object, partial)
}
exports.bind = bind

exports.bindAll = function (obj) {
  var bindMds = []
  if(arguments.length > 1) {
    bindMds = tools.slice(arguments, 1)
  } else {
    for(var i in obj) {
      if(tools.has(obj, i) && typeof obj[i] === 'function') {
        bindMds.push(obj[i])
      } 
    }
  }
  for(var i=bindMds, iLength=bindMds.length; i<iLength; ++i) {
    obj[bindMds[i]] = bind(obj[bindMds[i]], obj)
  }

  return obj
}

exports.partial = function (func) {
  var args = tools.slice(arguments, 1)
  return function () {
    var innerArg = tools.slice(arguments)
    args.forEach(function (e, i) {
      if(e.isLearnUnderscore) {
        args[i] = innerArg.shift()
      }
    }) 
    return func.apply(null, args.concat(innerArg))
  }
}

exports.memoize = function (func, hasher) {
  var memo = function (key) {
    var cache = memo.cache
    var address = '' + (hasher ? hasher.apply(this, arguments) : key)
    if(!tools.has(cache, address)) {
      cache[address] = func.apply(this, arguments)
    }
    return cache[address]
  }
  memo.cache = {}
  return memo
}

exports.delay = function (func, wait) {
  var funcArgs = tools.slice(arguments, 2)
  setTimeout(function () {
    func.apply(null, funcArgs)
  }, wait)
}

exports.defer = function (func) {
  var funcArgs = tools.slice(arguments, 1)
  setTimeout(function () {
    func.apply(null, funcArgs)
  })
}

// exports.throttle = function (func, wait, options) {
//   var context, args, result
//   var timeId = null
//   var previous = 0
//   if(tools.notExist(options)) {
//     options = {}
//   }

//   var later = function () {
//     previous = options.leading === false ? 0 : tools.now()
//     timeId = null
//     result = func.apply(context, args)
//     if(!timeId) context = args = null
//   }

//   return function () {
//     var cur = tools.now()
//     if(!previous && options.leading === false) {
//       previous = cur
//     }
//     var remaining = wait - (cur - previous)
//     context = this
//     args = arguments
//     if(remaining <= 0 || remaining > wait) {
//       if(!timeId) {
//         clearTimeout(timeId)
//       }
//       previous = cur
//       result = func.apply(context, args)
//       if(!timeId) context = args = null
//     } else if (!timeId && options.trailing !== false) {
//       setTimeout(later, remaining)
//     }
//     return result
//   }
// }

exports.once = function (func) {
  var isCalled = false
  var result
  return function () {
    if(isCalled) {
      return result
    }

    isCalled = true
    result = func.apply(func, arguments)
    return result
  }
}

exports.after = function (count, func) {
  return function () {
    if(--count < 1) {
      return func.apply(this, arguments)
    }
  }
}

exports.before = function (count, func) {
  var result
  return function () {
    if(count-- > 0) {
      result = func.apply(this, arguments)
    }
    if(count <= 0) {
      func = null
    }
    return result
  }
}

exports.wrap = function (func, wrap) {
  return function () {
    return wrap.apply(this, [func].concat(arguments))
  }
}

exports.negate = tools.negate

exports.compose = function () {
  var args = tools.slice(arguments)
  if(!args.length) return function () {} 

  var result
  return function () {
    var argsLen = args.length
    result = args[argsLen-1].apply(this, arguments)
    for(var i=argsLen-2; i>=0; --i) {
      result = args[i].call(this, result)
    }
    return result
  }
}
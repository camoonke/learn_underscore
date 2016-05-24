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
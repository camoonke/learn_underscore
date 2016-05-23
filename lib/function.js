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
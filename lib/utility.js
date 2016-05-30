var tools = require('./tools')

exports.identity = function (v) {
  return v
}

exports.constant = function (v) {
  return function () {
    return v
  }
}

exports.noop = function () {
  return void 0
}

exports.times = function (n, iteratee, context) {
  var result = Array(n > 0 ? n : 0)
  iteratee = tools.optimizeCb(iteratee, context)
  for(var i=0, iLength=result.length; i<iLength; ++i) {
    result[i] = iteratee(i)
  }
  return result
}

exports.random = function (min, max) {
  if(tools.notExist(max)) {
    max = min
    min = 0
  }
  return min + Math.floor(Math.random() * (max - min + 1))
}

// var ex = exports
// exports.mixin = function (object) {
//   var keys = tools.keys(object)
//   for(var i=0, iLength=keys.length; i<iLength; ++i) {
//     var curKey = keys[i]
//     ex[curKey] = object[curKey]
//   }
// }

var idCounter = 0
exports.uniqueId = function (prefix) {
  var id = ++idCounter + ''
  return prefix ? prefix + id : id
}

var escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;'
}
var unEscapeMap = tools.invert(escapeMap)
function createEscape(map) {
  var escaper = function (match) {
    return map[match]
  }
  var source = '(?:' + tools.keys(map).join('|') + ')'
  var testRegexp = RegExp(source)
  var replaceRegexp = RegExp(source, 'g')
  return function (string) {
    if(string === null || string === void 0) return string
    return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string
  }
}
exports.escape = createEscape(escapeMap)
exports.unescape = createEscape(unEscapeMap)

exports.result = function (obj, prop, defaultValue) {
  var value = obj === null ? void 0 : obj[prop]
  if(value === void 0) {
    value = defaultValue
  }
  return tools.isFunction(value) ? value.call(obj) : value
}

exports.now = tools.now

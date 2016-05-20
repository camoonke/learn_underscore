var tools = require('./tools')

exports.first = exports.head = exports.take = function (array, n) {
  if(!array || !array.length) return void 0
  if(n === void 0) return array[0]

  return array.slice(0, n)
}

// guard: 只有一个元素时，是直接返回该元素1还是数组0，
function sliceSomeElement (dir, guard) {
  return function (array, n) {
    var length = array.length
    if(!array || !length) return []
    if(n == null) {
      if(dir) {
        n = 1
      } else {
        return array[length - 1]
      }
    }

    var begin = dir ? 0 : -n
    var end = dir ? length - n : length
    return array.slice(begin, end)
  }
}

exports.initial = sliceSomeElement(true)

exports.last = sliceSomeElement(false)

exports.rest = exports.tail = exports.drop = function (array, index) {
  if(index == null) {
    index = 1
  }
  return array.slice(index, array.length)
}

exports.compact = function (array) {
  return tools.filter(array, function (v) {
    return !!v
  })
}

exports.flatten = function (array, shallow) {
  return tools.flatten(array, shallow, false)
}

function difference (array) {
  var rest = tools.flatten(arguments, true, true, 1)
  return tools.filter(array, function (v) {
    return !~rest.indexOf(v)
  })
}
exports.difference = difference

exports.without = function (array) {
  return difference(array, tools.slice(arguments, 1))
}

exports.uniq = tools.uniq

exports.union = function () {
  return tools.uniq(tools.flatten(arguments))
}

exports.intersection = function (array) {
  var result = []
  for(var i=0, iLength=array.length; i<iLength; ++i) {
    var value = array[i]
    if(~result.indexOf(value)) continue
    for(var j=1, jLength=arguments.length; j<jLength; ++j) {
      var temp = arguments[j]
      if(!~result.indexOf(value) && ~temp.indexOf(value)) {
        result.push(value)
      }
    }
  }
  return result
}

function unzip () {
  if(!arguments.length) return []

  var args= arguments[0]
  if(!args.length) return []

  var arr = args[0]
  var output = []
  for(var i=0, iLength=arr.length; i<iLength; ++i) {
    output[i] = []
    output[i].push(arr[i])
    for(var j=1, jLength=args.length; j<jLength; ++j) {
      output[i].push(args[j][i])
    }
  }
  return output
}

exports.unzip = unzip

exports.zip = function () {
  return unzip(arguments)
}

exports.object = function (list, values) {
  var output = {}
  for(var i=0, iLength=list.length; i<iLength; ++i) {
    if(values) {
      output[list[i]] = values[i]
    } else {
      output[list[i][0]] = list[i][1]
    }
  }
  return output
}

function findIndex (array, value, forward) {
  var len = array.length
  var i =  forward > 0 ? 0 : len - 1
  for(i; i>=0 && i<len; i+=forward) {
    if(array[i] === value) return i
  }
  return -1
}
exports.indexOf = function (array, value) {
  return findIndex(array, value, 1)
}

exports.lastIndexOf = function (array, value) {
  return findIndex(array, value, -1)
}
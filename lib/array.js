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

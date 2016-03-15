exports.chunk = function (arr, size) {
  size = Number(size)

  size = isNaN(size) ? 1 : size
  var _arr = []
  for (var i = 0, iLength = arr.length; i < iLength; i += size) {
    _arr.push(arr.slice(i, i + size))
  }
  return _arr
}
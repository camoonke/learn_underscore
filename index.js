var underscore = function () {

}

var functionArr = [
  require('./lib/array'),
  require('./lib/collection'),
  require('./lib/function'),
  require('./lib/object'),
  require('./lib/utility')
]

for (var i = 0; i < functionArr.length; i++) {
  for (var functionName in functionArr[i]) {
    underscore[functionName] = functionArr[i][functionName]
  }
}

underscore.isLearnUnderscore = true; // 通过这个变量来判断是否自身。_.bindKey 中会使用自身作为占位符

exports = module.exports = underscore;
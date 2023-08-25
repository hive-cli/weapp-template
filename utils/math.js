/**
 * 除法函数，用来得到精确的除法结果
 * @param {*} arg1 被除数
 * @param {*} arg2 除数
 */
export function accDiv(arg1, arg2) {
  var t1 = 0,
    t2 = 0,
    r1,
    r2
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) {}

  r1 = Number(arg1.toString().replace('.', ''))
  r2 = Number(arg2.toString().replace('.', ''))
  return (r1 / r2) * Math.pow(10, t2 - t1)
}

/**
 * 乘法函数，用来得到精确的乘法结果
 * @param {*} arg1
 * @param {*} arg2
 */
export function accMul(arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {}
  try {
    m += s2.split('.')[1].length
  } catch (e) {}
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m)
}

/**
 * 加法函数，用来得到精确的加法结果
 * @param {*} arg1
 * @param {*} arg2
 */
export function accAdd(arg1, arg2) {
  var r1, r2, m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}

/**
 * 减法函数，用来得到精确的加法结果
 * @param {*} arg1
 * @param {*} arg2
 */
export function accSub(arg1, arg2) {
  var r1, r2, m, n
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  //last modify by deeka
  //动态控制精度长度
  n = r1 >= r2 ? r1 : r2
  return ((arg2 * m - arg1 * m) / m).toFixed(n)
}

/**
 * 初始化
 * 将加、减、乘、除添加到 Number 类型，方便调用
 */
export function initMath() {
  Number.prototype.div = function (arg) {
    return accDiv(this, arg)
  }
  Number.prototype.mul = function (arg) {
    return accMul(arg, this)
  }
  Number.prototype.add = function (arg) {
    return accAdd(arg, this)
  }
  Number.prototype.sub = function (arg) {
    return accSub(arg, this)
  }
}

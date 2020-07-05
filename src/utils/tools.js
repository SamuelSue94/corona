// 节流函数
function throttle (fn, wait) {
  let timer = null
  return function () {
    const context = this
    const args = arguments
    if (!timer) {
      timer = setTimeout(function () {
        fn.apply(context, args)
        timer = null
      }, wait)
    }
  }
}

function deepCopy (obj) {
  return JSON.parse(JSON.stringify(obj))
}

export { throttle, deepCopy }

const catchAsyncFunction = function catchAsyncFunction(asyncFunction) {
  return function catchAsyncCallback(request, response, next) {
    asyncFunction(request, response, next).catch(next)
  }
}

module.exports = catchAsyncFunction

// DONE REVIEWING
const {Lecture} = require("../../models")
const {
  APIFeatures,
  catchAsyncFunction,
  ApplicationError
} = require("../../utils")

exports.aliasLecturesFiveLastLongest = function aliasLecturesFiveLastLongest(
  request,
  response,
  next
) {
  request.query.limit = "5"
  request.query.sort = "-duration".split(" ").join(",")
  request.query.fields = "name url duration".split(" ").join(",")
  next()
}

exports.getLectures = catchAsyncFunction(async (request, response, next) => {
  const apiFeatures = new APIFeatures(Lecture.find(), request.query)
    .filter()
    .fields()
    .paginate()
    .sort()

  const lectures = await apiFeatures.databaseQuery
  response.status(200).json({
    status: "success",
    results: lectures.length,
    data: {lectures}
  })
})

exports.getLecture = catchAsyncFunction(async (request, response, next) => {
  const {id} = request.params
  const lecture = await Lecture.findById(id)
  if (!lecture)
    return next(new ApplicationError("There is no lecture with this ID", 404))

  response.status(200).json({
    status: "success",
    data: {lecture}
  })
})

exports.createLecture = catchAsyncFunction(async (request, response, next) => {
  const lecture = await Lecture.create(request.body)
  response.status(201).json({
    status: "success",
    data: {lecture}
  })
})

exports.updateLecture = catchAsyncFunction(async (request, response, next) => {
  const {id} = request.params
  const options = {new: true, runValidators: true}
  const lecture = await Lecture.findByIdAndUpdate(id, request.body, options)
  if (!lecture)
    return next(new ApplicationError("There is no lecture with this ID", 404))

  response.status(200).json({
    status: "success",
    data: {lecture}
  })
})

exports.deleteLecture = catchAsyncFunction(async (request, response, next) => {
  const {id} = request.params
  const lecture = await Lecture.findByIdAndDelete(id)
  if (!lecture)
    return next(new ApplicationError("There is no lecture with this ID", 404))

  response.status(204).json({
    status: "success",
    data: null
  })
})

// DONE REVIEWING
const {APIFeatures, catchAsyncFunction} = require("../../utils")
const {Teacher} = require("../../models")

exports.getTeachers = catchAsyncFunction(async (request, response) => {
  const apiFeatures = new APIFeatures(Teacher.find(), request.query)
    .filter()
    .fields()
    .paginate()
    .sort()

  const teachers = await apiFeatures.databaseQuery
  response.status(200).json({
    status: "success",
    results: teachers.length,
    data: {teachers}
  })
})

exports.getTeacher = catchAsyncFunction(async (request, response) => {
  const {id} = request.params
  const teacher = await Teacher.findById(id)
  response.status(200).json({
    status: "success",
    data: {teacher}
  })
})

exports.createTeacher = catchAsyncFunction(async (request, response) => {
  const teacher = await Teacher.create(request.body)
  response.status(201).json({
    status: "success",
    data: {teacher}
  })
})

exports.updateTeacher = catchAsyncFunction(async (request, response) => {
  const {id} = request.params
  const options = {new: true, runValidators: true}
  const teacher = await Teacher.findByIdAndUpdate(id, request.body, options)
  response.status(200).json({
    status: "success",
    data: {teacher}
  })
})

exports.deleteTeacher = catchAsyncFunction(async (request, response) => {
  const {id} = request.params
  await Teacher.findByIdAndDelete(id)
  response.status(204).json({
    status: "success",
    data: null
  })
})

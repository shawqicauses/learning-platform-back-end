// DONE REVIEWING
const {Student} = require("../../models")
const {APIFeatures, catchAsyncFunction} = require("../../utils")

exports.getStudents = catchAsyncFunction(async (request, response) => {
  const apiFeatures = new APIFeatures(Student.find(), request.query)
    .filter()
    .fields()
    .paginate()
    .sort()

  const students = await apiFeatures.databaseQuery
  response.status(200).json({
    status: "success",
    results: students.length,
    data: {students}
  })
})

exports.getStudent = catchAsyncFunction(async (request, response) => {
  const {id} = request.params
  const student = await Student.findById(id)
  response.status(200).json({
    status: "success",
    data: {student}
  })
})

exports.createStudent = catchAsyncFunction(async (request, response) => {
  const student = await Student.create(request.body)
  response.status(201).json({
    status: "success",
    data: {student}
  })
})

exports.updateStudent = catchAsyncFunction(async (request, response) => {
  const {id} = request.params
  const options = {new: true, runValidators: true}
  const student = await Student.findByIdAndUpdate(id, request.body, options)
  response.status(200).json({
    status: "success",
    data: {student}
  })
})

exports.deleteStudent = catchAsyncFunction(async (request, response) => {
  const {id} = request.params
  await Student.findByIdAndDelete(id)
  response.status(204).json({
    status: "success",
    data: null
  })
})

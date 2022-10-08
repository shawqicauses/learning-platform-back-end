// DONE REVIEWING
const {Student} = require("../../models")
const {APIFeatures} = require("../../utils")

exports.getStudents = async function getStudents(request, response) {
  try {
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
  } catch (error) {
    response.status(400).json({
      status: "fail",
      message: error
    })
  }
}

exports.getStudent = async function getStudent(request, response) {
  try {
    const {id} = request.params
    const student = await Student.findById(id)
    response.status(200).json({
      status: "success",
      data: {student}
    })
  } catch (error) {
    response.status(400).json({
      status: "fail",
      message: error
    })
  }
}

exports.createStudent = async function createStudent(request, response) {
  try {
    const student = await Student.create(request.body)
    response.status(201).json({
      status: "success",
      data: {student}
    })
  } catch (error) {
    response.status(400).json({
      status: "fail",
      message: error
    })
  }
}

exports.updateStudent = async function updateStudent(request, response) {
  try {
    const {id} = request.params
    const options = {new: true, runValidators: true}
    const student = await Student.findByIdAndUpdate(id, request.body, options)
    response.status(200).json({
      status: "success",
      data: {student}
    })
  } catch (error) {
    response.status(400).json({
      status: "fail",
      message: error
    })
  }
}

exports.deleteStudent = async function deleteStudent(request, response) {
  try {
    const {id} = request.params
    await Student.findByIdAndDelete(id)
    response.status(204).json({
      status: "success",
      data: null
    })
  } catch (error) {
    response.status(400).json({
      status: "fail",
      message: error
    })
  }
}

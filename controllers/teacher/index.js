// DONE REVIEWING
const {APIFeatures} = require("../../utils")
const {Teacher} = require("../../models")

exports.getTeachers = async function getTeachers(request, response) {
  try {
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
  } catch (error) {
    response.status(400).json({
      status: "fail",
      message: error
    })
  }
}

exports.getTeacher = async function getTeacher(request, response) {
  try {
    const {id} = request.params
    const teacher = await Teacher.findById(id)
    response.status(200).json({
      status: "success",
      data: {teacher}
    })
  } catch (error) {
    response.status(400).json({
      status: "fail",
      message: error
    })
  }
}

exports.createTeacher = async function createTeacher(request, response) {
  try {
    const teacher = await Teacher.create(request.body)
    response.status(201).json({
      status: "success",
      data: {teacher}
    })
  } catch (error) {
    response.status(400).json({
      status: "fail",
      message: error
    })
  }
}

exports.updateTeacher = async function updateTeacher(request, response) {
  try {
    const {id} = request.params
    const options = {new: true, runValidators: true}
    const teacher = await Teacher.findByIdAndUpdate(id, request.body, options)
    response.status(200).json({
      status: "success",
      data: {teacher}
    })
  } catch (error) {
    response.status(400).json({
      status: "fail",
      message: error
    })
  }
}

exports.deleteTeacher = async function deleteTeacher(request, response) {
  try {
    const {id} = request.params
    await Teacher.findByIdAndDelete(id)
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

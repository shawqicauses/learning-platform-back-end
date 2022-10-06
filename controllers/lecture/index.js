// DONE REVIEWING
const {Lecture} = require("../../models")
const {APIFeatures} = require("../../utils")

exports.aliasLecturesFiveLastLongest =
  async function aliasLecturesFiveLastLongest(request, response, next) {
    request.query.limit = "5"
    request.query.sort = "-duration".split(" ").join(",")
    request.query.fields = "name url duration".split(" ").join(",")
    next()
  }

exports.getLectures = async function getLectures(request, response) {
  try {
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
  } catch (error) {
    response.status(400).json({
      status: "fail",
      message: error
    })
  }
}

exports.getLecture = async function getLecture(request, response) {
  try {
    const {id} = request.params
    const lecture = await Lecture.findById(id)
    response.status(200).json({
      status: "success",
      data: {lecture}
    })
  } catch (error) {
    response.status(400).json({
      status: "fail",
      message: error
    })
  }
}

exports.createLecture = async function createLecture(request, response) {
  try {
    const lecture = await Lecture.create(request.body)
    response.status(201).json({
      status: "success",
      data: {lecture}
    })
  } catch (error) {
    response.status(400).json({
      status: "fail",
      message: error
    })
  }
}

exports.updateLecture = async function updateLecture(request, response) {
  try {
    const {id} = request.params
    const options = {new: true, runValidators: true}
    const lecture = await Lecture.findByIdAndUpdate(id, request.body, options)
    response.status(200).json({
      status: "success",
      data: {lecture}
    })
  } catch (error) {
    response.status(400).json({
      status: "fail",
      message: error
    })
  }
}

exports.deleteLecture = async function deleteLecture(request, response) {
  try {
    const {id} = request.params
    await Lecture.findByIdAndDelete(id)
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

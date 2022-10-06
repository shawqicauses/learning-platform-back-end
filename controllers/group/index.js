// DONE REVIEWING
const {Group} = require("../../models")
const {APIFeatures} = require("../../utils")

exports.getGroups = async function getGroups(request, response) {
  try {
    const apiFeatures = new APIFeatures(Group.find(), request.query)
      .filter()
      .fields()
      .paginate()
      .sort()

    const groups = await apiFeatures.databaseQuery
    response.status(200).json({
      status: "success",
      results: groups.length,
      data: {groups}
    })
  } catch (error) {
    response.status(400).json({
      status: "fail",
      message: error
    })
  }
}

exports.getGroup = async function getGroup(request, response) {
  try {
    const {id} = request.params
    const group = await Group.findById(id)
    if (group === null) {
      response.status(404).json({
        status: "fail",
        message: "Student has no group"
      })
    } else {
      response.status(200).json({
        status: "success",
        data: {group}
      })
    }
  } catch (error) {
    response.status(400).json({
      status: "fail",
      message: error
    })
  }
}

exports.createGroup = async function createGroup(request, response) {
  try {
    const group = await Group.create(request.body)
    response.status(201).json({
      status: "success",
      data: {group}
    })
  } catch (error) {
    response.status(400).json({
      status: "fail",
      message: error
    })
  }
}

exports.updateGroup = async function updateGroup(request, response) {
  try {
    const {id} = request.params
    const options = {new: true, runValidators: true}
    const group = await Group.findByIdAndUpdate(id, request.body, options)
    response.status(200).json({
      status: "success",
      data: {group}
    })
  } catch (error) {
    response.status(400).json({
      status: "fail",
      message: error
    })
  }
}

exports.deleteGroup = async function deleteGroup(request, response) {
  try {
    const {id} = request.params
    await Group.findByIdAndDelete(id)
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

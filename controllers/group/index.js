// DONE REVIEWING
const {Group} = require("../../models")
const {APIFeatures, catchAsyncFunction} = require("../../utils")

exports.getGroups = catchAsyncFunction(async (request, response) => {
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
})

exports.getGroup = catchAsyncFunction(async (request, response) => {
  const {id} = request.params
  const group = await Group.findById(id)
  response.status(200).json({
    status: "success",
    data: {group}
  })
})

exports.createGroup = catchAsyncFunction(async (request, response) => {
  const group = await Group.create(request.body)
  response.status(201).json({
    status: "success",
    data: {group}
  })
})

exports.updateGroup = catchAsyncFunction(async (request, response) => {
  const {id} = request.params
  const options = {new: true, runValidators: true}
  const group = await Group.findByIdAndUpdate(id, request.body, options)
  response.status(200).json({
    status: "success",
    data: {group}
  })
})

exports.deleteGroup = async (request, response) => {
  const {id} = request.params
  await Group.findByIdAndDelete(id)
  response.status(204).json({
    status: "success",
    data: null
  })
}

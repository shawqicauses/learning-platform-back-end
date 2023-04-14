const {
  APIFeatures,
  ApplicationError,
  catchAsyncFunction
} = require("../../utils")

exports.getMany = function getMany(Model, populateOptions) {
  return catchAsyncFunction(async (request, response, next) => {
    let filter = {}
    let query = Model.find(filter)
    if (request.params.groupId) filter = {group: request.params.groupId}
    if (populateOptions) query = query.populate(populateOptions)

    const apiFeatures = new APIFeatures(query, request.query)
      .filter()
      .fields()
      .paginate()
      .sort()

    const documents = await apiFeatures.databaseQuery
    response.status(200).json({
      status: "success",
      results: documents.length,
      data: {documents}
    })
  })
}

exports.getOne = function getOne(Model, populateOptions) {
  return catchAsyncFunction(async (request, response, next) => {
    let query = Model.findById(request.params.id)
    if (populateOptions) query = query.populate(populateOptions)
    const document = await query

    if (!document)
      return next(
        new ApplicationError("There is no Document found with this ID"),
        404
      )

    response.status(200).json({
      status: "success",
      data: {document}
    })
  })
}

exports.createOne = function createOne(Model) {
  return catchAsyncFunction(async (request, response, next) => {
    const document = await Model.create(request.body)
    Model.syncIndexes()
    response.status(201).json({
      status: "success",
      data: {document}
    })
  })
}

exports.updateOne = function updateOne(Model) {
  return catchAsyncFunction(async (request, response, next) => {
    const document = await Model.findByIdAndUpdate(
      request.params.id,
      request.body,
      {new: true, runValidators: true}
    )

    if (!document)
      return next(
        new ApplicationError("There is no Document found with this ID"),
        404
      )

    response.status(200).json({
      status: "success",
      data: {document}
    })
  })
}

exports.deleteOne = function deleteOne(Model) {
  return catchAsyncFunction(async (request, response, next) => {
    const document = await Model.findByIdAndDelete(request.params.id)
    if (!document)
      return next(
        new ApplicationError("There is no Document found with this ID"),
        404
      )

    response.status(204).json({
      status: "success",
      data: null
    })
  })
}

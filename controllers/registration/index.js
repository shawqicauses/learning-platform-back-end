// DONE REVIEWING
const {Registration} = require("../../models")
const {APIFeatures, catchAsyncFunction} = require("../../utils")

exports.createRegistrationDate = function createRegistrationDate(
  request,
  response,
  next
) {
  request.body["registration-date"] = new Date().toISOString()
  next()
}

exports.getRegistrations = catchAsyncFunction(async (request, response) => {
  const apiFeatures = new APIFeatures(Registration.find(), request.query)
    .filter()
    .fields()
    .paginate()
    .sort()

  const registrations = await apiFeatures.databaseQuery
  response.status(200).json({
    status: "success",
    results: registrations.length,
    data: {registrations}
  })
})

exports.getRegistration = catchAsyncFunction(async (request, response) => {
  const {id} = request.params
  const registration = await Registration.findById(id)
  response.status(200).json({
    status: "success",
    data: {registration}
  })
})

exports.createRegistration = catchAsyncFunction(async (request, response) => {
  const registration = await Registration.create(request.body)
  response.status(201).json({
    status: "success",
    data: {registration}
  })
})

exports.updateRegistration = catchAsyncFunction(async (request, response) => {
  const {id} = request.params
  const options = {new: true, runValidators: true}
  const params = {id, body: request.body, options}
  const registration = await Registration.findByIdAndUpdate(...params)
  response.status(200).json({
    status: "success",
    data: {registration}
  })
})

exports.deleteRegistration = catchAsyncFunction(async (request, response) => {
  const {id} = request.params
  await Registration.findByIdAndDelete(id)
  response.status(204).json({
    status: "success",
    data: null
  })
})

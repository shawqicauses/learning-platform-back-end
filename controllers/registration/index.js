// DONE REVIEWING
const {Registration} = require("../../models")
const {APIFeatures} = require("../../utils")

exports.createRegistrationDate = async function createRegistrationDate(
  request,
  response,
  next
) {
  request.body["registration-date"] = new Date().toISOString()
  next()
}

exports.getRegistrations = async function getRegistrations(request, response) {
  try {
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
  } catch (error) {
    response.status(400).json({
      status: "fail",
      message: error
    })
  }
}

exports.getRegistration = async function getRegistration(request, response) {
  try {
    const {id} = request.params
    const registration = await Registration.findById(id)
    response.status(200).json({
      status: "success",
      data: {registration}
    })
  } catch (error) {
    response.status(400).json({
      status: "fail",
      message: error
    })
  }
}

exports.createRegistration = async function createRegistration(
  request,
  response
) {
  try {
    const registration = await Registration.create(request.body)
    response.status(201).json({
      status: "success",
      data: {registration}
    })
  } catch (error) {
    response.status(400).json({
      status: "fail",
      message: error
    })
  }
}

exports.updateRegistration = async function updateRegistration(
  request,
  response
) {
  try {
    const {id} = request.params
    const options = {new: true, runValidators: true}
    const params = {id, body: request.body, options}
    const registration = await Registration.findByIdAndUpdate(...params)
    response.status(200).json({
      status: "success",
      data: {registration}
    })
  } catch (error) {
    response.status(400).json({
      status: "fail",
      message: error
    })
  }
}

exports.deleteRegistration = async function deleteRegistration(
  request,
  response
) {
  try {
    const {id} = request.params
    await Registration.findByIdAndDelete(id)
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

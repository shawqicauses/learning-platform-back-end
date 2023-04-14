const {User} = require("../../models")
const {catchAsyncFunction, ApplicationError} = require("../../utils")
const {getMany, getOne, updateOne, deleteOne} = require("../factory")

const filterObject = function filterObject(object, ...allowedFields) {
  const filteredObject = {}
  Object.keys(object).forEach((key) => {
    if (allowedFields.includes(key)) {
      filteredObject[key] = object[key]
    }
  })

  return filteredObject
}

exports.getUsers = getMany(User)
exports.getUser = getOne(User)
exports.updateUser = updateOne(User)
exports.deleteUser = deleteOne(User)

exports.aliasMe = function aliasMe(request, response, next) {
  request.params.id = request.user.id
  next()
}

exports.updateMe = catchAsyncFunction(async (request, response, next) => {
  // 1. Create error if user POSTED password information
  // 2. Filter out un-wanted fields that are not allowed to be updated
  // 3. Update user document if everything user POSTED is OKAY
  if (request.body.password || request.body["password-confirm"]) {
    const message = [
      "This route is not for updating password.",
      "Please use /update-my-password route"
    ].join(" ")

    return next(new ApplicationError(message, 400)) // 1.
  }

  const fields = ["first-name", "middle-name", "last-name", "email"]
  const body = filterObject(request.body, ...fields) // 2.
  const user = await User.findOneAndUpdate(request.user.id, body, {
    new: true,
    runValidators: true
  }) // 3.

  response.status(200).json({
    status: "success",
    data: {user}
  })
})

exports.deleteMe = catchAsyncFunction(async (request, response, next) => {
  await User.findByIdAndUpdate(request.user.id, {active: false})
  response.status(204).json({status: "success", data: null})
})

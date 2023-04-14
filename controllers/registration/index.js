// DONE REVIEWING
const {Registration} = require("../../models")
const {getMany, getOne, createOne, updateOne, deleteOne} = require("../factory")

exports.getRegistrations = getMany(Registration)
exports.getRegistration = getOne(Registration)
exports.createRegistration = createOne(Registration)
exports.updateRegistration = updateOne(Registration)
exports.deleteRegistration = deleteOne(Registration)

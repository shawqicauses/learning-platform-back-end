// DONE REVIEWING
const {Navigation} = require("../../models")
const {getMany, getOne, createOne, updateOne, deleteOne} = require("../factory")

exports.getNavigations = getMany(Navigation)
exports.getNavigation = getOne(Navigation)
exports.createNavigation = createOne(Navigation)
exports.updateNavigation = updateOne(Navigation)
exports.deleteNavigation = deleteOne(Navigation)

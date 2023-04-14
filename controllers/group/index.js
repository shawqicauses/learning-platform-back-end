// DONE REVIEWING
const {Group} = require("../../models")
const {getMany, getOne, createOne, updateOne, deleteOne} = require("../factory")

exports.getGroups = getMany(Group)
exports.getGroup = getOne(Group)
exports.createGroup = createOne(Group)
exports.updateGroup = updateOne(Group)
exports.deleteGroup = deleteOne(Group)

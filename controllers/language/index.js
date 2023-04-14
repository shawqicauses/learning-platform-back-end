// DONE REVIEWING
const {Language} = require("../../models")
const {getMany, getOne, createOne, updateOne, deleteOne} = require("../factory")

exports.getLanguages = getMany(Language)
exports.getLanguage = getOne(Language)
exports.createLanguage = createOne(Language)
exports.updateLanguage = updateOne(Language)
exports.deleteLanguage = deleteOne(Language)

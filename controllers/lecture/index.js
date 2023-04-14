// DONE REVIEWING
const {Lecture} = require("../../models")
const {getMany, getOne, createOne, updateOne, deleteOne} = require("../factory")

exports.getLectures = getMany(Lecture)
exports.getLecture = getOne(Lecture)
exports.createLecture = createOne(Lecture)
exports.updateLecture = updateOne(Lecture)
exports.deleteLecture = deleteOne(Lecture)

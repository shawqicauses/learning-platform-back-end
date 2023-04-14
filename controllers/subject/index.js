const {Subject, SubjectEnrollment} = require("../../models")
const {getMany, getOne, createOne, updateOne, deleteOne} = require("../factory")

exports.getSubjects = getMany(Subject)
exports.getSubject = getOne(Subject)
exports.createSubject = createOne(Subject)
exports.updateSubject = updateOne(Subject)
exports.deleteSubject = deleteOne(Subject)

exports.getSubjectsEnrollments = getMany(SubjectEnrollment)
exports.createSubjectsEnrollments = createOne(SubjectEnrollment)
exports.aliasSubjectsEnrollmentsIds = function aliasSubjectsEnrollmentsIds(
  request,
  response,
  next
) {
  if (!request.body.group) request.body.group = request.params.group
  if (!request.body.subject) request.body.subject = request.params.id
  next()
}

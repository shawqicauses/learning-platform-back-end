// DONE REVIEWING
const express = require("express")
const {teacherController} = require("../../controllers")

const router = express.Router()
router
  .route("/")
  .get(teacherController.getTeachers)
  .post(teacherController.createTeacher)

module.exports = router

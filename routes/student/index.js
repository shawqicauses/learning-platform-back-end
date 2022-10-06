// DONE REVIEWING
const express = require("express")
const {studentController} = require("../../controllers")

const router = express.Router()
router
  .route("/")
  .get(studentController.getStudents)
  .post(studentController.createStudentName)
  .post(studentController.createStudent)

router.route("/:id").delete(studentController.deleteStudent)
module.exports = router

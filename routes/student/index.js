// DONE REVIEWING
const express = require("express")
const {authController, studentController} = require("../../controllers")

const router = express.Router()
router.post("/signup", authController.signupStudent)
router.post("/login", authController.loginStudent)
router.route("/").get(studentController.getStudents)
router
  .route("/:id")
  .get(studentController.getStudent)
  .patch(studentController.updateStudent)
  .delete(studentController.deleteStudent)

module.exports = router

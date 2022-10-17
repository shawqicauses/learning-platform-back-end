// DONE REVIEWING
const registrationController = require("./registration")
const groupController = require("./group")
const userController = require("./user")
const teacherController = require("./teacher")
const studentController = require("./student")
const lectureController = require("./lecture")
const authController = require("./auth")
const errorController = require("./error")

module.exports = {
  registrationController,
  groupController,
  userController,
  teacherController,
  studentController,
  lectureController,
  authController,
  errorController
}

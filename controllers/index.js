// DONE REVIEWING
const groupController = require("./group")
const registrationController = require("./registration")
const userController = require("./user")
const subjectController = require("./subject")
const lectureController = require("./lecture")
const navigationController = require("./navigation")
const languageController = require("./language")
const authController = require("./auth")
const errorController = require("./error")

module.exports = {
  groupController,
  registrationController,
  userController,
  subjectController,
  lectureController,
  navigationController,
  languageController,
  authController,
  errorController
}

// DONE REVIEWING
const express = require("express")
const {registrationController} = require("../../controllers")

const router = express.Router()
router
  .route("/")
  .get(registrationController.getRegistrations)
  .post(registrationController.createRegistrationDate)
  .post(registrationController.createRegistration)

module.exports = router

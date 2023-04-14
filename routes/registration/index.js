// DONE REVIEWING
const express = require("express")
const {registrationController, authController} = require("../../controllers")

const router = express.Router()
router.use(authController.isAuthenticated)

router
  .route("/")
  .get(registrationController.getRegistrations)
  .post(registrationController.createRegistration)

router
  .route("/:id")
  .get(registrationController.getRegistration)
  .patch(registrationController.updateRegistration)
  .delete(registrationController.deleteRegistration)

module.exports = router

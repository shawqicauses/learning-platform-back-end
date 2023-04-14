// DONE REVIEWING
const express = require("express")
const {authController, languageController} = require("../../controllers")

const router = express.Router()
router
  .route("/")
  .get(languageController.getLanguages)
  .post(authController.isAuthenticated, languageController.createLanguage)

router
  .route("/:id")
  .get(languageController.getLanguage)
  .patch(authController.isAuthenticated, languageController.updateLanguage)
  .delete(authController.isAuthenticated, languageController.deleteLanguage)

module.exports = router

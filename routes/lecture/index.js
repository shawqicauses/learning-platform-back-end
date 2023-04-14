// DONE REVIEWING
const express = require("express")
const {authController, lectureController} = require("../../controllers")

const router = express.Router()
router.use(authController.isAuthenticated)

router
  .route("/")
  .get(lectureController.getLectures)
  .post(lectureController.createLecture)

router
  .route("/:id")
  .get(lectureController.getLecture)
  .patch(lectureController.updateLecture)
  .delete(lectureController.deleteLecture)

module.exports = router

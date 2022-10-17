// DONE REVIEWING
const express = require("express")
const {authController, lectureController} = require("../../controllers")

const router = express.Router()
router
  .route("/")
  .get(authController.protectRoute, lectureController.getLectures)
  .post(lectureController.createLecture)

router
  .route("/five-last-longest")
  .get(lectureController.aliasLecturesFiveLastLongest)
  .get(lectureController.getLectures)

router
  .route("/:id")
  .get(lectureController.getLecture)
  .patch(lectureController.updateLecture)
  .delete(
    authController.protectRoute,
    authController.restrictTo("admin", "assistant"),
    lectureController.deleteLecture
  )

module.exports = router

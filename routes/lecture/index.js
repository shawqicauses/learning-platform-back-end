// DONE REVIEWING
const express = require("express")
const {lectureController} = require("../../controllers")

const router = express.Router()
router
  .route("/")
  .get(lectureController.getLectures)
  .post(lectureController.createLecture)

router
  .route("/five-last-longest")
  .get(lectureController.aliasLecturesFiveLastLongest)
  .get(lectureController.getLectures)

router
  .route("/:id")
  .get(lectureController.getLecture)
  .patch(lectureController.updateLecture)
  .delete(lectureController.deleteLecture)

module.exports = router

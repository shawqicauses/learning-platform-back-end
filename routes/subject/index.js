const express = require("express")
const {authController, subjectController} = require("../../controllers")

const router = express.Router({mergeParams: true})
router.use(authController.isAuthenticated)
router
  .route("/")
  .get(subjectController.getSubjects)
  .post(subjectController.createSubject)

router
  .route("/:id")
  .get(subjectController.getSubject)
  .post(subjectController.aliasSubjectsEnrollmentsIds)
  .post(subjectController.createSubjectsEnrollments)
  .patch(subjectController.updateSubject)
  .delete(subjectController.deleteSubject)

module.exports = router

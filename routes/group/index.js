// DONE REVIEWING
const express = require("express")
const subjectRoutes = require("../subject")
const {groupController, authController} = require("../../controllers")

const router = express.Router()
router.use(authController.isAuthenticated)

router
  .route("/")
  .get(groupController.getGroups)
  .post(groupController.createGroup)

router
  .route("/:id")
  .get(groupController.getGroup)
  .patch(groupController.updateGroup)
  .delete(groupController.deleteGroup)

router.use("/:group/subjects", subjectRoutes)
module.exports = router

// DONE REVIEWING
const express = require("express")
const {groupController} = require("../../controllers")

const router = express.Router()
router
  .route("/")
  .get(groupController.getGroups)
  .post(groupController.createGroup)

router
  .route("/:id")
  .get(groupController.getGroup)
  .patch(groupController.updateGroup)
  .delete(groupController.deleteGroup)

module.exports = router

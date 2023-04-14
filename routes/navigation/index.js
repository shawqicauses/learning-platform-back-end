// DONE REVIEWING
const express = require("express")
const {authController, navigationController} = require("../../controllers")

const router = express.Router()
router.use(authController.isAuthenticated)

router
  .route("/")
  .get(navigationController.getNavigations)
  .post(navigationController.createNavigation)

router
  .route("/:id")
  .get(navigationController.getNavigation)
  .patch(navigationController.updateNavigation)
  .delete(navigationController.deleteNavigation)

module.exports = router

const express = require("express")
const {authController, userController} = require("../../controllers")

const router = express.Router()
router.post("/teachers/signup", authController.signupUser("teacher"))
router.post("/students/signup", authController.signupUser("student"))
router.post("/login", authController.loginUser)

router.post("/password/forget", authController.forgotPassword)
router.patch("/password/reset/:token", authController.resetPassword)
// router.use(authController.isAuthenticated)

router
  .route("/me")
  .get(userController.aliasMe)
  .get(userController.getUser)
  .patch(userController.updateMe)
  .delete(userController.deleteMe)

router.route("/me/password/update").patch(authController.updatePassword)
router.route("/").get(userController.getUsers)
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)

module.exports = router

const express = require("express")
const {authController, userController} = require("../../controllers")

const router = express.Router()
router.post("/forgot-password", authController.forgotPassword)
router.patch("/reset-password/:token", authController.resetPassword)
router.patch(
  "/update-my-password",
  authController.protectRoute,
  authController.updatePassword
)

router.patch("/update-me", authController.protectRoute, userController.updateMe)
router.delete(
  "/delete-me",
  authController.protectRoute,
  userController.deleteMe
)

module.exports = router

// DONE REVIEWING
/* eslint no-param-reassign: "off" */
const util = require("util")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const {User, Student} = require("../../models")
const {ApplicationError, catchAsyncFunction, sendMail} = require("../../utils")

const signToken = function signToken(id) {
  const tokenSecret = process.env.JWT_SECRET
  const tokenExpiresIn = process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
  const token = jwt.sign({id}, tokenSecret, {expiresIn: tokenExpiresIn})
  return token
}

const createAndSendToken = function createAndSendToken(
  user,
  statusCode,
  response
) {
  const token = signToken(user.id)
  const tokenExpiresIn = process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
  const cookieOptions = {
    expires: new Date(Date.now() + tokenExpiresIn),
    httpOnly: true,
    secure: false
  }

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true
  response.cookie("jwt", token, cookieOptions)
  response.status(statusCode).json({status: "success", token, data: {user}})
}

exports.signupStudent = catchAsyncFunction(async (request, response, next) => {
  const student = await Student.create({
    "first-name": request.body["first-name"],
    "second-name": request.body["second-name"],
    "last-name": request.body["last-name"],
    "email": request.body.email,
    "password": request.body.password,
    "password-confirm": request.body["password-confirm"],
    "phone-number": request.body["phone-number"]
  })

  createAndSendToken(student, 201, response)
})

exports.loginStudent = catchAsyncFunction(async (request, response, next) => {
  // 1. Check if email and password exist
  // 2. Check if student exists and password is correct
  // 3. Send token to client if everything is okay
  const {email, password} = request.body
  if (!email || !password) {
    const message = "Please provide your email and password"
    return next(new ApplicationError(message, 400)) // 1.
  }

  const fields = ["+", "password"].join("")
  const student = await Student.findOne({email}).select(fields)
  if (
    !student ||
    !(await student.isPasswordCorrect(password, student.password))
  )
    return next(new ApplicationError("In-correct email or password", 401)) // 2.
  createAndSendToken(student, 200, response) // 3.
})

exports.protectRoute = catchAsyncFunction(async (request, response, next) => {
  // 1. Get token and check if it exists in request headers or not
  // 2. Verify token and check if it is valid token or not
  // 3. Check if user still exists after his/her token was issued
  // 4. Check if user changed password after his/her was issued
  let token
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer")
  )
    [bearer, token] = request.headers.authorization.split(" ")

  if (!token) {
    const message = "You are not authenticated. Login to have access"
    return next(new ApplicationError(message, 401)) // 1.
  }

  const tokenSecret = process.env.JWT_SECRET
  const decodedToken = await util.promisify(jwt.verify)(token, tokenSecret) // 2.
  const currentUser = await User.findById(decodedToken.id)

  if (!currentUser) {
    const message = "User belongs to this token does no longer exist"
    return next(new ApplicationError(message, 401)) // 3.
  }

  if (currentUser.isPasswordChanged(decodedToken.iat)) {
    const message = "User has changed his password. Login to have access"
    return next(new ApplicationError(message, 401)) // 4.
  }

  request.user = currentUser
  next() // Finally, Grant Access To Protected Route
})

exports.restrictTo = function restrictTo(...roles) {
  return function middleware(request, response, next) {
    if (!roles.includes(request.user.role)) {
      const message = "You do not have permission to perform this action"
      return next(new ApplicationError(message, 401))
    }

    next()
  }
}

exports.forgotPassword = catchAsyncFunction(async (request, response, next) => {
  // 1. Get user based on POSTED email address
  // 2. Generate random token to reset user password
  // 3. Send random token to user's email
  const user = await User.findOne({email: request.body.email}) // 1.
  if (!user)
    return next(
      new ApplicationError("There is no user with email address", 404)
    )

  const resetToken = user.createPasswordResetToken()
  await user.save({validateBeforeSave: false}) // 2.

  const resetLink = [
    `${request.protocol}://${request.get("host")}`,
    `/api/1/users/reset-password/${resetToken}`
  ].join("")

  try {
    await sendMail({
      to: user.email,
      subject: "Your Password Reset Token",
      text: [
        `Forget your password? Submit a PATCH request with your new password to: ${resetLink}`,
        `If you did not forget your password, please ignore this email!`
      ].join(" ")
    }) // 3.

    response.status(200).json({
      status: "success",
      message: "Your reset token has been sent to your email"
    })
  } catch (error) {
    user["password-reset-token"] = undefined
    user["password-reset-expires-in"] = undefined
    await user.save({validateBeforeSave: false})
    return next(new ApplicationError("There was an error sending email", 500))
  }
})

exports.resetPassword = catchAsyncFunction(async (request, response, next) => {
  // 1. Get user based on his/her token
  // 2. Set password if token is not expired and user exits
  // 3. Update password-changed-at property (done automatically)
  // 4. Log user in and send his/her token to client
  const hashedToken = crypto
    .createHash("SHA-256".split("-").join("").toLowerCase())
    .update(request.params.token)
    .digest("HEX".toLowerCase())

  const user = await User.findOne({
    "password-reset-token": hashedToken,
    "password-reset-expires-in": {$gt: Date.now()}
  }) // 1.

  if (!user)
    return next(new ApplicationError("Token is in-valid or has expired", 401))
  user.password = request.body.password
  user["password-confirm"] = request.body["password-confirm"]
  user["password-reset-token"] = undefined
  user["password-reset-expires-in"] = undefined
  await user.save() // 2.

  createAndSendToken(user, 200, response) // 4.
})

exports.updatePassword = catchAsyncFunction(async (request, response, next) => {
  // 1. Get user from users collection
  // 2. Check if POSTED current password is correct
  // 3. IF current password is correct, update user password
  // 4. Log user in and sent his/her token in response
  const fields = ["+", "password"].join("")
  const user = await User.findById(request.user.id).select(fields) // 1.

  if (
    !request.body.password ||
    !request.body["password-confirm"] ||
    !request.body["password-current"]
  ) {
    const message = "Please fill-in every password field"
    return next(new ApplicationError(message, 400))
  }

  if (
    !(await user.isPasswordCorrect(
      request.body["password-current"],
      user.password
    ))
  )
    return next(new ApplicationError("Your current password is wrong", 401)) // 2.

  user.password = request.body.password
  user["password-confirm"] = request.body["password-confirm"]
  user.save() // 3.

  createAndSendToken(user, 200, response) // 4.
})

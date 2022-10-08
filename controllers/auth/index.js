const jwt = require("jsonwebtoken")
const {Student} = require("../../models")
const {AppError} = require("../../utils")

const signToken = function signToken(id) {
  const secret = process.env.JWT_SECRET
  const expiresIn = process.env.JWT_EXPIRES_IN
  const token = jwt.sign({id}, secret, {expiresIn})
  return token
}

exports.signupStudent = async function signupStudent(request, response, next) {
  try {
    const student = await Student.create({
      "role": 0,
      "first-name": request.body["first-name"],
      "second-name": request.body["second-name"],
      "last-name": request.body["last-name"],
      "email": request.body.email,
      "password": request.body.password,
      "password-confirm": request.body["password-confirm"],
      "group-id": "not-defined"
    })

    const token = signToken(student.id)
    response.status(201).json({status: "success", token, data: {student}})
  } catch (error) {
    response.status(400).json({
      status: "fail",
      message: error
    })
  }
}

exports.loginStudent = async function loginStudent(request, response, next) {
  const {email, password} = request.body
  // 1. Check if email and password exist
  // 2. Check if student exists and password is correct
  // 3. Send token to client if everything is okay

  const message = "Please provide email and password"
  if (!email || !password) return next(new AppError(message, 400)) // 1.

  const fields = ["+", "password"].join("")
  const student = await Student.findOne({email}).select(fields)
  if (!student || !(await student.correctPassword(password, student.password)))
    return next(new AppError("In-correct email or password", 401)) // 2.

  const token = signToken(student.id)
  response.status(200).json({status: "success", token}) // 3.
}

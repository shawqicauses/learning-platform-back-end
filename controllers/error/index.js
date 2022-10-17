/* eslint no-console: "off" */
const {ApplicationError} = require("../../utils")

const DuplicateFieldsDBError = function DuplicateFieldsDBError(error) {
  const value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0]
  const message = `Duplicate field value: ${value}. Please use another one`
  return new ApplicationError(message, 400)
}

const CastDBError = function CastDBError(error) {
  const message = `In-valid ${error.path}: ${error.value}`
  return new ApplicationError(message, 400)
}

const ValidationDBError = function ValidationDBError(error) {
  const errors = Object.values(error.errors).map((value) => value.message)
  const message = `In-valid fields input. ${errors.join(". ")}`
  return new ApplicationError(message, 400)
}

const InvalidTokenJWTError = function InvalidTokenJWTError() {
  const message = "In-valid token. Please login again"
  return new ApplicationError(message, 401)
}

const ExpiredJWTError = function ExpiredJWTError() {
  const message = "Your token has expired. Please login again"
  return new ApplicationError(message, 401)
}

const sendErrorDevelopment = function sendErrorDevelopment(error, response) {
  const {statusCode, status, message, stack} = error
  response.status(statusCode).json({status, error, message, stack})
}

const sendErrorProduction = function sendErrorProduction(error, response) {
  // Operational, trusted error: send message to client-side
  const {isOperational, statusCode, status, message} = error
  if (isOperational) response.status(statusCode).json({status, message})
  // Programming or undefined errors: never send any details to client-side
  // Log error information and send generic message to user
  else {
    console.error("Error: ", error)
    response.status(500).json({
      status: "error",
      message: "Something went so wrong!"
    })
  }
}

/* eslint no-param-reassign: "off" */
const ErrorController = function ErrorController(
  error,
  request,
  response,
  next
) {
  error.statusCode = error.statusCode || 500
  error.status = error.status || "error"

  if (process.env.NODE_ENV === "development")
    sendErrorDevelopment(error, response)
  if (process.env.NODE_ENV === "production") {
    if (error.code === 11000) error = DuplicateFieldsDBError(error)
    if (error.name === "CastError") error = CastDBError(error)
    if (error.name === "ValidationError") error = ValidationDBError(error)
    if (error.name === "JsonWebTokenError") error = InvalidTokenJWTError()
    if (error.name === "TokenExpiredError") error = ExpiredJWTError()
    sendErrorProduction(error, response)
  }
}

module.exports = ErrorController

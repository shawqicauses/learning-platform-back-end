class ApplicationError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.status = String(statusCode)[0] === "4" ? "fail" : "error"
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = ApplicationError

// DONE REVIEWING
const express = require("express")
const morgan = require("morgan")
const helmet = require("helmet")
const mongoSanitize = require("express-mongo-sanitize")
const xss = require("xss-clean")
const hpp = require("hpp")
const rateLimit = require("express-rate-limit")
const {
  groupRoutes,
  registrationRoutes,
  userRoutes,
  subjectRoutes,
  lectureRoutes,
  navigationRoutes,
  languageRoutes
} = require("./routes")
const {errorController} = require("./controllers")
const {ApplicationError} = require("./utils")

const rateLimiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP. Try again in an hour!"
})

const app = express()
if (process.env.NODE_ENV === "development") app.use(morgan("dev")) // Development Console
app.use(express.json({limit: [10, "KB".toLowerCase()].join("")})) // Body JSON Parser

app.use(helmet()) // Set Security HTTP Headers
app.use(mongoSanitize()) // Data Sanitization Against NoSQL Query Injection
app.use(xss()) // Data Sanitization Against Cross-Site-Scripting
app.use(hpp({whitelist: ["duration"]})) // Prevent Parameter Pollution
app.use("/api", rateLimiter) // Limit Request From Same API
app.use("/api/1/groups", groupRoutes)
app.use("/api/1/registrations", registrationRoutes)
app.use("/api/1/users", userRoutes)
app.use("/api/1/subjects", subjectRoutes)
app.use("/api/1/lectures", lectureRoutes)
app.use("/api/1/navigations", navigationRoutes)
app.use("/api/1/languages", languageRoutes)

app.all("*", (request, response, next) => {
  const message = ["Could not find", request.url, "on our server"].join(" ")
  next(new ApplicationError(message, 404))
})

app.use(errorController)
module.exports = app

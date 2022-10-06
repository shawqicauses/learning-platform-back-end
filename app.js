// DONE REVIEWING
const express = require("express")
const morgan = require("morgan")
const {
  registrationRoutes,
  groupRoutes,
  teacherRoutes,
  studentRoutes,
  lectureRoutes
} = require("./routes")

const app = express()

if (process.env.NODE_ENV === "development") app.use(morgan("dev"))
app.use(express.json())

app.use("/api/1/registrations", registrationRoutes)
app.use("/api/1/groups", groupRoutes)
app.use("/api/1/teachers", teacherRoutes)
app.use("/api/1/students", studentRoutes)
app.use("/api/1/lectures", lectureRoutes)

module.exports = app

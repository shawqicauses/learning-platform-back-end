// DONE REVIEWING
/* eslint no-console: "off" */
const dotenv = require("dotenv")
const mongoose = require("mongoose")

process.on(["Uncaught".toLowerCase(), "Exception"].join(""), (error) => {
  console.log(error.name, error.message)
  console.log("Uncaught Exception! Shutting Down ...")
  process.exit(1)
})

dotenv.config({path: "./config.env"})
const app = require("./app")

const PORT = process.env.PORT || 3000
const PASSWORD = process.env.DATABASE_PASSWORD || null
const DB = process.env.DATABASE_URL.replace("<PASSWORD>", PASSWORD)

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB connection successful!"))

const message = ["Application is running on port:", PORT].join(" ")
const server = app.listen(PORT, () => console.log(message))
process.on(["Unhandled".toLowerCase(), "Rejection"].join(""), (error) => {
  console.log(error.name, error.message)
  console.log("Unhandled Rejection! Shutting Down ...")
  server.close(() => process.exit(1))
})

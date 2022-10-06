// DONE REVIEWING
const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config({path: "./config.env"})
const app = require("./app")

const port = process.env.PORT || 3000
const password = process.env.DATABASE_PASSWORD || null
const DB = process.env.DATABASE_URL.replace("<PASSWORD>", password)

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB connection successful!"))

const message = ["Application is running on port:", port].join(" ")
app.listen(port, () => console.log(message))

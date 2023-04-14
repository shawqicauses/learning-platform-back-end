const mongoose = require("mongoose")

const navigationChildrenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A navigation must have a name"],
    trim: true
  },
  type: {
    type: String,
    require: [true, "A navigation must have a type"],
    trim: true
  },
  route: {
    type: String,
    required: [true, "A navigation must have a route"],
    trim: true
  }
})

const navigationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A navigation must have a name"],
    unique: true,
    trim: true
  },
  type: {
    type: String,
    require: [true, "A navigation must have a type"],
    trim: true
  },
  route: {
    type: String,
    required: [true, "A navigation must have a route"],
    trim: true
  },
  icon: {
    type: String,
    required: [true, "A navigation must have a icon"],
    trim: true
  },
  children: [navigationChildrenSchema]
})

const Navigation = mongoose.model("Navigation", navigationSchema)
module.exports = Navigation

const crypto = require("crypto")
const mongoose = require("mongoose")
const validator = require("validator")
const bcryptjs = require("bcryptjs")

// DONE REVIEWING
const userSchema = new mongoose.Schema(
  {
    "role": {
      type: String,
      enum: ["admin", "assistant", "teacher", "student"],
      required: [true, "A user must have a role"],
      default: "student",
      trim: true
    },
    "first-name": {
      type: String,
      required: [true, "A user must have a first name"],
      trim: true
    },
    "middle-name": {
      type: String,
      required: [true, "A user must have a middle name"],
      trim: true
    },
    "last-name": {
      type: String,
      required: [true, "A user must have a last name"],
      trim: true
    },
    "email": {
      type: String,
      required: [true, "A user must have an email"],
      validate: [validator.isEmail, "A user must have a valid email"],
      unique: true,
      trim: true,
      lowercase: true
    },
    "password": {
      type: String,
      required: [true, "A user must have a password"],
      select: false,
      trim: true,
      minlength: 8
    },
    "password-confirm": {
      type: String,
      required: [true, "A user must have a password confirm field"],
      validate: {
        message: "Password confirm must match password",
        // This only works on .create() and .save()
        validator(element) {
          return element === this.password
        }
      },
      trim: true,
      minlength: 8
    },
    "password-changed-at": {
      type: Date,
      required: [true, "A user must have a password changed field"],
      default: Date.now(),
      trim: true
    },
    "password-reset-token": {
      type: String,
      required: false,
      default: undefined,
      trim: true
    },
    "password-reset-token-expires-in": {
      type: Date,
      require: false,
      default: undefined,
      trim: true
    },
    "phone-number": {
      type: String,
      required: [true, "A user must have a phone number"],
      validate: [
        validator.isMobilePhone,
        "A user must have a valid phone number"
      ],
      trim: true,
      minlength: 10
    },
    "active": {
      type: Boolean,
      required: false,
      default: true,
      select: false
    }
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }
)

userSchema.virtual("registrations", {
  ref: "Registration",
  foreignField: "user",
  localField: ["_", "id"].join("")
})

userSchema.virtual("name").get(function callback() {
  return [this["first-name"], this["middle-name"], this["last-name"]].join(" ")
})

userSchema.pre("save", async function callback(next) {
  // 1. Run this function if user password was modified
  // 2. Hash user password field with a cost of 12
  // 3. Delete user password confirm field from our database
  if (!this.isModified("password")) return next() // 1.
  this.password = await bcryptjs.hash(this.password, 12) // 2.
  this["password-confirm"] = undefined // 3.
  next()
})

userSchema.pre("save", function callback(next) {
  if (!this.isModified("password") || this.isNew) return next()
  this["password-changed-at"] = Date.now() - 1000
  next()
})

userSchema.pre(/^find/, function callback(next) {
  this.find({active: {$ne: false}})
  next()
})

userSchema.methods.isPasswordCorrect = async function isPasswordCorrect(
  candidatePassword,
  userPassword
) {
  return await bcryptjs.compare(candidatePassword, userPassword)
}

userSchema.methods.isPasswordChanged = function isPasswordChanged(
  JWTTimestamp
) {
  if (!this["password-changed-at"]) return false
  const timestamp = this["password-changed-at"].getTime()
  const changedTimestamp = parseInt(timestamp / 1000, 10)
  return JWTTimestamp < changedTimestamp
}

userSchema.methods.createPasswordResetToken =
  function createPasswordResetToken() {
    const resetToken = crypto.randomBytes(32).toString("HEX".toLowerCase())
    this["password-reset-token"] = crypto
      .createHash("SHA-256".split("-").join("").toLowerCase())
      .update(resetToken)
      .digest("HEX".toLowerCase())

    this["password-reset-token-expires-in"] = Date.now() + 10 * 60 * 1000
    return resetToken
  }

const User = mongoose.model("User", userSchema)
module.exports = User

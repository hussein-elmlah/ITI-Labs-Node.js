const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 8,
    },
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
    },
    dob: {
      type: Date,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  { timestamps: true, runValidators: true }
);

// Hook to trim all input strings before validating
userSchema.pre("validate", function (next) {
  for (const key in this._doc) {
    if (this._doc.hasOwnProperty(key) && typeof this._doc[key] === "string") {
      this._doc[key] = this._doc[key].trim();
    }
  }
  next();
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Validate and Hash password in update
userSchema.pre("findOneAndUpdate", async function (next) {
  try {
    // Trim string fields in the update object
    for (const key in this._update) {
      if (
        this._update.hasOwnProperty(key) &&
        typeof this._update[key] === "string"
      ) {
        this._update[key] = this._update[key].trim();
      }
    }
    // Enable validation for the update operation
    this.options.runValidators = true;

    next();
  } catch (error) {
    next(error);
  }
});
userSchema.post("findOneAndUpdate", async function (doc) {
  // Check if the 'password' field exists in the update object and is a string
  if (this._update.password && typeof this._update.password === "string") {
    const hashedPassword = await bcrypt.hash(this._update.password, 10);
    this._update.password = hashedPassword;
  }
  // Mark the 'password' field as modified before saving
  doc.markModified("password");
  // Save the document to persist the changes
  await doc.save();
});

module.exports = mongoose.model("User", userSchema);

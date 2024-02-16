const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 20,
    },
    status: {
      type: String,
      enum: ["to-do", "in progress", "done"],
      default: "to-do",
    },
    tags: {
      type: [String],
      maxlength: 10,
    },
  },
  { timestamps: true }
);

// Hook to trim all input strings before validating
todoSchema.pre("validate", function (next) {
  for (const key in this._doc) {
    if (this._doc.hasOwnProperty(key) && typeof this._doc[key] === "string") {
      this._doc[key] = this._doc[key].trim();
    }
  }
  next();
});

module.exports = mongoose.model("Todo", todoSchema);

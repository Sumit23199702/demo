const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    USN: {
      type: String,
      required: true,
      unique: true,
    },
    Age: {
      type: Number,
      required: true,
    },
    Gender: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Mobile: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Student_Data", studentSchema);

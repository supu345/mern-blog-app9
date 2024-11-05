const mongoose = require("mongoose");

const subscribeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscribe", subscribeSchema);

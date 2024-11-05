const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDes: { type: String, required: true },
    longDes: { type: String, required: true },
    image: { type: String, required: true },
    remark: { type: String, required: true },
    categoryID: { type: mongoose.Schema.Types.ObjectId, required: true },
    writer: { type: mongoose.Schema.Types.ObjectId, ref: "users" }, // Add writer field
  },
  { timestamps: true, versionKey: false }
);
const BlogModel = mongoose.model("blogs", DataSchema);
module.exports = BlogModel;

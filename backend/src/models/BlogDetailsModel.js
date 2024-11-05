const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    img1: { type: String, required: true },
    img2: { type: String },
    img3: { type: String },
    img4: { type: String },
    img5: { type: String },
    img6: { type: String },
    img7: { type: String },
    img8: { type: String },

    des: { type: String, required: true },

    blogID: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, versionKey: false }
);
const BlogDetailsModel = mongoose.model("blogdetails", DataSchema);
module.exports = BlogDetailsModel;

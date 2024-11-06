const mongoose = require("mongoose");

// const commentSchema = new mongoose.Schema(
//   {
//     blogId: {
//       type: String,
//       required: true,
//     },
//     commentTex: {
//       type: String,
//       required: true,
//     },
//     userName: {
//       type: String,
//       required: true,
//     },
//     userImage: {
//       type: String,
//       required: true,
//     },
//     relpyComment: [
//       {
//         relpyName: {
//           type: String,
//           required: true,
//         },
//         relpyImage: {
//           type: String,
//           required: true,
//         },
//         relpyTime: {
//           type: String,
//           required: true,
//         },
//         relpyText: {
//           type: String,
//           required: true,
//         },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Comment", commentSchema);

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    _Id: {
      type: Schema.Types.ObjectId,
      ref: "blogs",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    replies: [
      {
        username: {
          type: String,
          required: true,
        },
        commentId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        reply: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);

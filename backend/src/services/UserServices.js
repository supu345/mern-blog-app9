const EmailSend = require("../utility/EmailHelper");
const UserModel = require("../models/UserModel");
const ProfileModel = require("../models/ProfileModel");
const ContactModel = require("../models/ContactModel");
const { EncodeToken } = require("../utility/TokenHelper");
const SubscribeModel = require("../models/SubscribeModel");

// const UserOTPService = async (req) => {
//   try {
//     let email = req.params.email;
//     let code = Math.floor(100000 + Math.random() * 900000);

//     let EmailText = `Your Verification Code is= ${code}`;
//     let EmailSubject = "Email Verification";

//     await EmailSend(email, EmailText, EmailSubject);

//     await UserModel.updateOne(
//       { email: email },
//       { $set: { otp: code } },
//       { upsert: true }
//     );

//     return { status: "success", message: "6 Digit OTP has been send" };
//   } catch (e) {
//     return { status: "fail", message: "Something Went Wrong" };
//   }
// };
// const VerifyOTPService = async (req) => {
//   try {
//     let email = req.params.email;
//     let otp = req.params.otp;

//     // User Count
//     let total = await UserModel.find({ email: email, otp: otp }).count("total");
//     if (total === 1) {
//       // User ID Read
//       let user_id = await UserModel.find({ email: email, otp: otp }).select(
//         "_id"
//       );

//       // User Token Create
//       let token = EncodeToken(email, user_id[0]["_id"].toString());

//       // OTP Code Update To 0
//       await UserModel.updateOne({ email: email }, { $set: { otp: "0" } });

//       return { status: "success", message: "Valid OTP", token: token };
//     } else {
//       return { status: "fail", message: "Invalid OTP" };
//     }
//   } catch (e) {
//     return { status: "fail", message: "Invalid OTP" };
//   }
// };

// const VerifyOTPService = async (req) => {
//   try {
//     let email = req.params.email;
//     let otp = req.params.otp;

//     // User Count
//     let total = await UserModel.find({
//       email: email,
//       otp: otp,
//     }).countDocuments();
//     if (total === 1) {
//       // User ID Read
//       let user = await UserModel.findOne({ email: email, otp: otp }).select(
//         "_id"
//       );

//       // User Token Create
//       let token = EncodeToken(email, user._id.toString());

//       // OTP Code Update To 0
//       await UserModel.updateOne({ email: email }, { $set: { otp: "0" } });

//       return { status: "success", message: "Valid OTP", token: token };
//     } else {
//       return { status: "fail", message: "Invalid OTP" };
//     }
//   } catch (e) {
//     return {
//       status: "fail",
//       message: "Something went wrong during OTP verification",
//     };
//   }
// };
const UserOTPService = async (req) => {
  try {
    let email = req.params.email;
    let code = Math.floor(100000 + Math.random() * 900000);

    let EmailText = `Your Verification Code is ${code}`;
    let EmailSubject = "Email Verification";

    await EmailSend(email, EmailText, EmailSubject);

    await UserModel.updateOne(
      { email: email },
      { $set: { otp: code } },
      { upsert: true }
    );

    return { status: "success", message: "6 Digit OTP has been sent" };
  } catch (e) {
    console.error(e); // Log error for debugging
    return { status: "fail", message: "Something went wrong" };
  }
};

// Service to verify OTP and generate token
const VerifyOTPService = async (req) => {
  try {
    let email = req.params.email;
    let otp = req.params.otp;

    let total = await UserModel.find({
      email: email,
      otp: otp,
    }).countDocuments();

    if (total === 1) {
      let user = await UserModel.findOne({ email: email, otp: otp }).select(
        "_id role"
      );
      let token = EncodeToken(email, user._id.toString(), user.role);

      await UserModel.updateOne({ email: email }, { $set: { otp: "0" } });

      return { status: "success", message: "Valid OTP", token: token };
    } else {
      return { status: "fail", message: "Invalid OTP" };
    }
  } catch (e) {
    console.error(e); // Log error for debugging
    return {
      status: "fail",
      message: "Something went wrong during OTP verification",
    };
  }
};

const SaveProfileService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;
    await ProfileModel.updateOne(
      { userID: user_id },
      { $set: reqBody },
      { upsert: true }
    );
    return { status: "success", message: "Profile Save Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

const ReadProfileService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let result = await ProfileModel.find({ userID: user_id });
    return { status: "success", data: result };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

// services/UserServices.js
const CreateContactService = async (req, res) => {
  try {
    const { fullname, email, subject, message } = req.body;

    // Validate input fields
    if (!fullname || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new contact entry
    const newContact = new ContactModel({ fullname, email, subject, message });
    await newContact.save();

    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

const CreateSubscribeService = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate input fields
    if (!email) {
      return res.status(400).json({ error: "email is required" });
    }

    // Create a new contact entry
    const newSubscribe = new SubscribeModel({ email });
    await newSubscribe.save();

    res.status(201).json({ message: "Subscribe submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

const ContactListService = async () => {
  try {
    let data = await ContactModel.find();
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e }.toString();
  }
};
module.exports = {
  UserOTPService,
  VerifyOTPService,
  CreateContactService,
  SaveProfileService,
  ReadProfileService,
  CreateSubscribeService,
  ContactListService,
};

const {
  UserOTPService,
  VerifyOTPService,
  SaveProfileService,
  ReadProfileService,
  CreateContactService,
  CreateSubscribeService,
  ContactListService,
  DeleteContactService,
  SubscribeListService,
  DeleteSubscribeService,
  UserListService,
  DeleteUserService,
  UserCommetsServices,
} = require("../services/UserServices");

exports.UserOTP = async (req, res) => {
  let result = await UserOTPService(req);
  return res.status(200).json(result);
};
exports.VerifyLogin = async (req, res) => {
  let result = await VerifyOTPService(req);

  if (result["status"] === "success") {
    // Cookies Option
    let cookieOption = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: false,
    };

    // Set Cookies With Response
    res.cookie("token", result["token"], cookieOption);
    return res.status(200).json(result);
  } else {
    return res.status(200).json(result);
  }
};

// exports.VerifyLogin = async (req, res) => {
//   let result = await VerifyOTPService(req);

//   console.log("Verification Result:", result); // Check result from VerifyOTPService

//   if (result.status === "success") {
//     let cookieOption = {
//       expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
//       httpOnly: true,
//       path: "/", // Optional
//     };

//     res.cookie("token", result.token, cookieOption);
//     console.log("Cookie Set:", result.token); // Confirm token is set
//     return res.status(200).json(result);
//   } else {
//     return res.status(401).json(result); // Return 401 for failure
//   }
// };

exports.UserLogout = async (req, res) => {
  let cookieOption = {
    expires: new Date(Date.now() - 24 * 60 * 60 * 1000), // Corrected multiplier to one day
    httpOnly: true,
    path: "/", // Set to true for security
  };
  res.cookie("token", "", cookieOption);
  return res.status(200).json({ status: "success" });
};
exports.CreateProfile = async (req, res) => {
  let result = await SaveProfileService(req);
  return res.status(200).json(result);
};

exports.UpdateProfile = async (req, res) => {
  let result = await SaveProfileService(req);
  return res.status(200).json(result);
};

exports.ReadProfile = async (req, res) => {
  let result = await ReadProfileService(req);
  return res.status(200).json(result);
};

exports.CreateContact = async (req, res) => {
  try {
    await CreateContactService(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error occurred while creating contact" });
  }
};

exports.CreateSubscribe = async (req, res) => {
  try {
    await CreateSubscribeService(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error occurred while creating subscribe" });
  }
};

exports.ContactList = async (req, res) => {
  let result = await ContactListService();
  return res.status(200).json(result);
};

//delete blog
exports.DeleteContact = async (req, res) => {
  try {
    let result = await DeleteContactService(req, res);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in Delete Contact controller:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

exports.SubscribeList = async (req, res) => {
  let result = await SubscribeListService();
  return res.status(200).json(result);
};
//delete Subscribe
exports.DeleteSubscribe = async (req, res) => {
  try {
    let result = await DeleteSubscribeService(req, res);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in Delete Subscribe controller:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

exports.UserList = async (req, res) => {
  let result = await UserListService();
  return res.status(200).json(result);
};

//delete Subscribe
exports.DeleteUser = async (req, res) => {
  try {
    let result = await DeleteUserService(req, res);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in Delete user controller:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

exports.CreateComments = async (req, res) => {
  let result = await UserCommetsServices(req);
  return res.status(200).json(result);
};

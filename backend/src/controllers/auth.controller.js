const userModel = require("../models/user.model.js");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validation
    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please Fill all fields",
      });
    }
    //exisiting user
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(401).send({
        success: false,
        message: "user already exisits",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 6);

    //save new user
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "New User Created",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error In Register callback",
      success: false,
      error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "email is not registerd",
      });
    }
    //password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invlid name or password",
      });
    }
    return res.status(200).send({
      success: true,
      messgae: "login successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Login Callcback",
      error,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    // For JWT-based authentication, the server-side can only send a response indicating logout is successful
    // Client-side should handle token removal
    return res.status(200).send({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in logout callback",
      error,
    });
  }
};

const UserService = require("../services/user-service");
const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      success: true,
      data: response,
      message: "User created sucessfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "something went wrong",
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(
      req.body.email,
      req.body.password
    );
    return res.status(200).json({
      success: true,
      data: response,
      message: "login sucessfull",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Authentication failed",
    });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await userService.isAuthenticated(token);
    console.log(response);
    return res.status(200).json({
      message: "sucessfully authenticated",
      success: true,
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "unauthorized call",
    });
  }
};

const isAdmin = async (req, res) => {
  try {
    console.log(req.body)
    const response = await userService.isAdmin(req.body.id);
    return res.status(200).json({
      data: response,
      success: true,
      message: "sucessfully fetched",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "something went erong",
    });
  }
};

module.exports = {
  create,
  signIn,
  isAuthenticated,
  isAdmin
};

const validateUserAuth = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      message: "something went wrong",
      error: "Email or password missing",
    });
  }
  next();
};

module.exports = {
    validateUserAuth
}

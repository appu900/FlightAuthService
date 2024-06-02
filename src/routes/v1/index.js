const router = require("express").Router();

const UserController = require("../../controllers/user-controller");
const { AuthRequestValidator } = require("../../middlewares/index");

router.post(
  "/signup",
  AuthRequestValidator.validateUserAuth,
  UserController.create
);

router.post(
  "/signin",
  AuthRequestValidator.validateUserAuth,
  UserController.signIn
);

router.get("/isAdmin", UserController.isAdmin);

router.post("/isAuthenticated", UserController.isAuthenticated);
router.get("/isAdmin", UserController.isAdmin);
module.exports = router;

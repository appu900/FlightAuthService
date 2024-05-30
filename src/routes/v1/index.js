const router = require("express").Router();

const UserController = require("../../controllers/user-controller");

router.post("/signup", UserController.create);

module.exports = router;

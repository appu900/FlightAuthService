const express = require("express");
const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const db = require("./models/index");
const { User, Role } = require("./models/index");
dotenv.config();

const app = express();

const prepareAndStartServer = () => {
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`server runnning on ${PORT}`);

    // if (process.env.DB_SYNC == false) {
    //   db.sequelize.sync({ alter: true });
    // }

    // const user = await User.findByPk(3);
    // const role = await Role.findByPk(1);

    // const response = await user.getRoles();
    // console.log(response);

    //  const res = await user.hasRole(role);
    //  console.log(res);
  });
};

prepareAndStartServer();

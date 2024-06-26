const { StatusCodes } = require("http-status-codes");
const { User, Role } = require("../models/index");
const ClientError = require("../utils/client-error");
const ValidationError = require("../utils/validation-error");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      throw error;
    }
  }

  async destroy(userId) {
    try {
      const user = await User.destroy({
        where: {
          id: userId,
        },
      });
      return true;
    } catch (error) {
      console.log("Something went wrong");
      throw error;
    }
  }

  async getById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["email", "id"],
      });
      return user;
    } catch (error) {
      console.log("something went wrong in reposiyory layer");
      throw error;
    }
  }

  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      if (!user) {
        throw new ClientError(
          "invalid input",
          "user not found with this email",
          "invalid login attemt",
          404
        );
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const adminRole = await Role.findOne({
        where: {
          name: "ADMIN",
        },
      });
      return user.hasRoles(adminRole);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserRepository;

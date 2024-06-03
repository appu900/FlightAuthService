const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");
const bcrypt = require("bcrypt");
const AppErrors = require("../utils/error-handler");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw error;
      }
      throw new AppErrors(
        "ServerError",
        "Something went wrong",
        "something went wrong is service layer",
        500
      );
    }
  }

  async signIn(email, password) {
    try {
      const user = await this.userRepository.getByEmail(email);
      if (!user) {
        throw new Error("user not found with this email");
      }

      const passwordsMatch = this.checkPassword(password, user.password);
      if (!passwordsMatch) {
        console.log("password doesnot match");
        throw new Error("incorrect Password");
      }

      const newJWT = this.createToken({ email: user.email, id: user.id });
      return newJWT;
    } catch (error) {
      console.log("somethinh went wrong in  signin Process");
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, {
        expiresIn: "5h",
      });
      return result;
    } catch (error) {
      console.log("something went wrong in token creation");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("error in verifying token");
      throw error;
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("something went wrong in password comparision");
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      // console.log("token data",response)
      if (!response) {
        throw { error: "invalid token" };
      }
      const user = await this.userRepository.getById(response.id);
      if (!user) {
        throw { error: "No user with the correspending token exits" };
      }
      return user.id;
    } catch (error) {
      console.log("error is cheking authentication", error);
      throw error;
    }
  }

  async isAdmin(userId) {
    try {
      console.log(userId);
      return await this.userRepository.isAdmin(userId);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;

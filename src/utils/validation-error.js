const { StatusCodes } = require("http-status-codes");
const AppError = require("./error-handler");

class ValidationError extends AppError {
  constructor(error) {
    let errorName = error.name;
    let description = [];
    error.errors.forEach((err) => {
      description.push(err.message);
    });

    super(
      errorName,
      "Not able to validate the Data sent in the request",
      description,
      StatusCodes.BAD_REQUEST
    );
  }
}

module.exports = ValidationError;

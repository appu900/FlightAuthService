const AppErrors = require("./error-handler");

class ClientError extends AppErrors {
  constructor(name,message,description,statusCode) {
    super(name,message,description,statusCode);
  }
}

module.exports = ClientError;

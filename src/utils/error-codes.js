const ClientErrorCodes = Object.freeze({
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
  });
  
  const ServerErrorsCodes = Object.freeze({
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
  });
  
  const SucessCodes = Object.freeze({
    CREATED: 201,
    OK: 200,
  });
  
  module.exports = {
    ClientErrorCodes,
    ServerErrorsCodes,
    SucessCodes,
  };
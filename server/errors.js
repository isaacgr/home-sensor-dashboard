const { ERR_CODES } = require("jaysonic/lib/util/constants");
const { formatError } = require("jaysonic/lib/util/format");

class InvalidCredentialsError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidCredentialsError";
    this.message = formatError({
      message: "Invalid credentials",
      code: ERR_CODES.invalidRequest,
      delimiter: "\n",
      jsonrpc: "2.0",
      id: null
    });
  }
}

class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthenticatedError";
    this.message = formatError({
      message: "Unauthenticated",
      code: ERR_CODES.invalidRequest,
      delimiter: "\n",
      jsonrpc: "2.0",
      id: null
    });
  }
}

class InvalidMethodError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidMethodError";
    this.message = formatError({
      message: "Invalid Method",
      code: ERR_CODES.methodNotFound,
      delimiter: "\n",
      jsonrpc: "2.0",
      id: null
    });
  }
}

class InvalidQueryError extends Error {
  constructor(message, data) {
    super(message);
    this.name = "InvalidQueryError";
    this.data = data;
  }
}

module.exports = {
  InvalidCredentialsError,
  UnauthenticatedError,
  InvalidMethodError,
  InvalidQueryError
};

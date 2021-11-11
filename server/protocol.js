const HttpServerProtocol = require("jaysonic/lib/server/protocol/http");
const { InvalidCredentialsError, InvalidMethodError } = require("./errors");

const ALLOWED_METHODS = ["POST"];

class HttpProtocol extends HttpServerProtocol {
  constructor(factory, client, response, version, delimiter) {
    super(factory, client, response, version, delimiter);
  }

  clientConnected() {
    super.clientConnected();
    if (!ALLOWED_METHODS.includes(this.client.method)) {
      return this.gotError(new InvalidMethodError());
    }
    const headers = this.client.headers;
    if (!headers["authorization"]) {
      return this.gotError(new InvalidCredentialsError());
    }
    const auth = headers["authorization"].split(" ")[1];
    const [username, password] = new Buffer.from(auth, "base64")
      .toString("ascii")
      .split(":");
    if (
      username !== process.env.API_USER ||
      password !== process.env.API_PASS
    ) {
      return this.gotError(new InvalidCredentialsError());
    }
  }
}

module.exports = {
  HttpProtocol
};

require("dotenv").config();
const HttpServerFactory = require("jaysonic/lib/server/http");
const { HttpProtocol } = require("./protocol");
const fs = require("fs");
const { connectDatabase, client } = require("../db/db");
const {
  setTemperature,
  getTemperatures,
  getTemperature,
  getNetworkSpeeds,
  setNetworkSpeed
} = require("./methods");

class HttpServer extends HttpServerFactory {
  constructor(options) {
    super(options);
    this.protocol = HttpProtocol;
  }

  clientConnected(client) {
    console.log(
      `Client connection made. [${client.remoteAddress}:${client.remotePort}]`
    );
  }

  clientDisconnected(client) {
    super.clientDisconnected(client);
    console.log(
      `Client connection closed. [${client.remoteAddress}:${client.remotePort}]`
    );
  }
}

const server = new HttpServer({
  scheme: "https",
  host: "0.0.0.0",
  port: 8585,
  ssl: {
    key: fs.readFileSync("/root/ssl/irowell.io.key"),
    cert: fs.readFileSync("/root/ssl/irowell_io_chain.crt")
  }
});

server.method("set.temperature", setTemperature);
server.method("get.temperatures", getTemperatures);
server.method("get.temperature", getTemperature);
server.method("get.network.speeds", getNetworkSpeeds);
server.method("set.network.speed", setNetworkSpeed);

const startServer = async () => {
  try {
    await server.listen();
    console.log("Listening.");
  } catch (e) {
    console.log(e.message);
    console.log("Shutting down.");
  }
};

process.on("SIGINT", () => {
  console.log("Shutting down.");
  server.close();
  client.close();
  process.exit();
});

startServer();
connectDatabase();

module.exports = {
  server
};

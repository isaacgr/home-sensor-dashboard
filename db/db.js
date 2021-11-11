const MongoClient = require("mongodb").MongoClient;
const { temperatureSchema, networkSpeedSchema } = require("./schemas");

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qomeh.mongodb.net/homeSensors?retryWrites=true&w=majority`;

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connectDatabase = async () => {
  try {
    await client.connect();
    console.log("Database connected.");
    try {
      // await createCollection("temperatures", {
      //   validator: temperatureSchema,
      //   validationLevel: "strict",
      //   validationAction: "error"
      // });
      // await createCollection("networkSpeeds", {
      //   validator: networkSpeedSchema,
      //   validationLevel: "strict",
      //   validationAction: "error"
      // });
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    throw e;
  }
};

const createCollection = async (collectionName, options) => {
  const db = client.db("homeSensors");
  try {
    await db.createCollection(collectionName, options);
    console.log(`${collectionName} created.`);
  } catch (e) {
    throw e;
  }
};

module.exports = {
  client,
  connectDatabase
};

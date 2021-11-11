const { client } = require("../db/db");
const moment = require("moment");
const { InvalidQueryError } = require("./errors");

const setTemperature = async (params) => {
  console.log("Got [set.temperature] request.");
  try {
    params.date = moment().unix();
    const db = client.db("homeSensors");
    await db.collection("temperatures").insertOne(params);
    console.log(`Set temperature document [${JSON.stringify(params)}].`);
    return 0;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const getTemperatures = async () => {
  console.log("Got [get.temperatures] request.");
  try {
    const db = client.db("homeSensors");
    return await db.collection("temperatures").find({}).toArray();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const getTemperature = async (params) => {
  console.log("Got [get.temperature] request.");
  const db = client.db("homeSensors");
  const results = [];
  try {
    const validQueries = [
      "date_range",
      "locations",
      "min_temperature_C",
      "min_temperature_F",
      "max_temperature_C",
      "max_temperature_F"
    ];

    for (const query of Object.keys(params)) {
      if (!validQueries.includes(query)) {
        const error = new InvalidQueryError("Invalid query parameter", query);
        throw error;
      }
      if (query === "date_range") {
        const { from, to } = params[query];
        const fromDate = moment(from).unix();
        const toDate = moment(to).unix();
        const res = await db
          .collection("temperatures")
          .find({ date: { $gte: fromDate, $lte: toDate } })
          .toArray();
        results.push(...res);
      } else if (query === "locations") {
        const res = await db
          .collection("temperatures")
          .find({ location: { $in: params[query] } })
          .toArray();
        results.push(...res);
      } else if (query.includes("min_")) {
        const fieldValue = query.split("min_")[1];
        const res = await db
          .collection("temperatures")
          .find({ [fieldValue]: { $gte: params[query] } })
          .toArray();
        results.push(...res);
      } else if (query.includes("max_")) {
        const fieldValue = query.split("max_")[1];
        const res = await db
          .collection("temperatures")
          .find({ [fieldValue]: { $lte: params[query] } })
          .toArray();
        results.push(...res);
      }
    }
    return results;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const setNetworkSpeed = async (params) => {
  console.log("Got [set.network.speeds] request.");
  try {
    params.date = moment().unix();
    const db = client.db("homeSensors");
    await db.collection("networkSpeeds").insertOne(params);
    console.log(`Set networkSpeed document [${JSON.stringify(params)}].`);
    return 0;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const getNetworkSpeeds = async () => {
  console.log("Got [get.network.speeds] request.");
  try {
    const db = client.db("homeSensors");
    return await db.collection("networkSpeeds").find({}).toArray();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = {
  setTemperature,
  getTemperatures,
  getTemperature,
  setNetworkSpeed,
  getNetworkSpeeds
};

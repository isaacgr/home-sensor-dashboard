const temperatureSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: [
      "temperature_C",
      "temperature_F",
      "location",
      "humidity",
      "date"
    ],
    properties: {
      temperature_C: {
        bsonType: "number",
        description: "must be a floating point value"
      },
      humidity: {
        bsonType: "number",
        description: "must be a floating point value"
      },
      temperature_F: {
        bsonType: "number",
        description: "must be a floating point value"
      },
      location: {
        bsonType: "string",
        description: "must be a string representing the location"
      },
      date: {
        bsonType: "int",
        description: "must be a 64-bit integer representing UTC datetime"
      }
    }
  }
};

const networkSpeedSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["upload", "download", "ping", "ip", "date"],
    properties: {
      download: {
        bsonType: "number",
        description: "must be a number representing the download speed"
      },
      upload: {
        bsonType: "number",
        description: "must be a number representing the upload speed"
      },
      ping: {
        bsonType: "number",
        description: "must be a number representing the ping time"
      },
      ip: {
        bsonType: "string",
        description:
          "must be a string representing the ip address of the client"
      },
      date: {
        bsonType: "int",
        description: "must be a 64-bit integer representing UTC datetime"
      }
    }
  }
};

module.exports = {
  temperatureSchema,
  networkSpeedSchema
};

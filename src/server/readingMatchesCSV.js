const csv = require("csvtojson");

const readMatchCSV = async () => {
  try {
    const data = await csv().fromFile("src/data/matches.csv");
    return data;
  } catch (err) {
    console.log(err);
  }
};

const readDeliveryCSV = async () => {
  try {
    const data = await csv().fromFile("src/data/deliveries.csv");
    return data;
  } catch (error) {
    console.log(error);
  }
};

const readUmpireCSV = async () => {
  try {
    const data = await csv().fromFile("src/data/umpires.csv");
    return data;
  } catch (error) {
    console.log(error);
  }
};
matchResults = readMatchCSV();
deliveryResults = readDeliveryCSV();
umpireResults = readUmpireCSV();

module.exports = { matchResults, deliveryResults, umpireResults };

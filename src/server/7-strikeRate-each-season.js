const fs = require("fs");
const { matchResults, deliveryResults } = require("./readingMatchesCSV");

// const player = "V Kohli";

const getResult = async () => {
  const deliveryData = await deliveryResults;
  const matchData = await matchResults;

  const filteredMatchesBySeason = matchData.reduce((acc, match) => {
    const { season, id } = match;
    if (!acc[season]) {
      acc[season] = [];
    }
    acc[season].push(id);
    return acc;
  }, {});

  // console.log(filteredMatchesBySeason);
  const runs_deliveries_by_season = deliveryData.reduce((acc, delivery) => {
    const { match_id, batsman, batsman_runs } = delivery;
    for (let season in filteredMatchesBySeason) {
      if (filteredMatchesBySeason[season].includes(match_id)) {
        if (!acc[season]) {
          acc[season] = {};
          acc[season][batsman]={}
          acc[season][batsman]["runs_scored"] = 0;
          acc[season][batsman]["deliveries_faced"] = 0;
        }
        if (!acc[season][batsman]) {
          acc[season][batsman]={}
          acc[season][batsman]["runs_scored"] = 0;
          acc[season][batsman]["deliveries_faced"] = 0;
        }
        acc[season][batsman]["runs_scored"] += parseInt(batsman_runs);
        acc[season][batsman]["deliveries_faced"] += 1;
      }
    }
    return acc;
  }, {});

  // console.log((runs_deliveries_by_season));
  const strike_rate_by_season = {};
  for (let season in runs_deliveries_by_season) {
    strike_rate_by_season[season] = {}
    for (let batsman in runs_deliveries_by_season[season]) {
      const { runs_scored, deliveries_faced } = runs_deliveries_by_season[season][batsman];
      const strikeRate = (runs_scored / deliveries_faced) * 100;
      strike_rate_by_season[season][batsman] = strikeRate;
    }
  }
  // console.log(strike_rate_by_season);
  const data = JSON.stringify(strike_rate_by_season, null, 2);

  fs.writeFile(
    "src/public/output/7-strikeRate_each_season.json",
    data,
    "utf-8",
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("File Saved");
      }
    }
  );
};

getResult();

const fs = require("fs");
const results = require("./readingMatchesCSV");
const getResult = async () => {
  try {
    let allData = await results.matchResults;
    const matchesPlayedPerYear = allData.reduce((acc, match) => {
      let { season, ...args } = match;
      if (acc[season]) {
        acc[season]++;
      } else {
        acc[season] = 1;
      }
      return acc;
    }, {});
    console.log(matchesPlayedPerYear);
    const data = JSON.stringify(matchesPlayedPerYear, null, 2);

    fs.writeFile(
      "src/public/output/1-matches-per-year.json",
      data,
      "utf-8",
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("File saved");
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

getResult();

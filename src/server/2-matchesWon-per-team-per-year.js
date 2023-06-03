const fs = require("fs");
const results = require("./readingMatchesCSV");

const getResult = async () => {
  try {
    let allData = await results.matchResults;
    const matchesWon_perTeam_perYear = allData.reduce((acc, match) => {
      const { season, winner } = match;
      if (acc[season]) {
        if (acc[season][winner]) {
          acc[season][winner] += 1;
        } else {
          acc[season][winner] = 1;
        }
      } else {
        acc[season] = {};
        acc[season][winner] = 1;
      }
      return acc;
    }, {});
    console.log(matchesWon_perTeam_perYear);
    const data = JSON.stringify(matchesWon_perTeam_perYear, null, 2);
    fs.writeFile(
      "src/public/output/2-matchesWon-per-team-per-year.json",
      data,
      "utf-8",
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("File Saved successfully");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

getResult();

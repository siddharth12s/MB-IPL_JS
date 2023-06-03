const fs = require("fs");
const results = require("./readingMatchesCSV");

const getResult = async () => {
  try {
    const deliveryData = await results.deliveryResults;
    const matchData = await results.matchResults;
    const filteredMatches = matchData
      .filter((match) => match.season === "2016")
      .reduce((acc, match) => {
        const { id } = match;
        acc.push(id);
        return acc;
      }, []);

    const extra_runs_2016_perTeam = deliveryData.reduce((acc, delivery) => {
      const { match_id, bowling_team, extra_runs } = delivery;
      if (filteredMatches[match_id]) {
        if (!acc[bowling_team]) {
          acc[bowling_team] = 0;
        }
        acc[bowling_team] += parseInt(extra_runs);
      }
      return acc;
    }, {});
    console.log(extra_runs_2016_perTeam);

    const data = JSON.stringify(extra_runs_2016_perTeam, null, 2);

    fs.writeFile(
      "src/public/output/3-Extra-Runs-Conceded-2016.json",
      data,
      "utf-8",
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("File saved successfully");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

getResult();

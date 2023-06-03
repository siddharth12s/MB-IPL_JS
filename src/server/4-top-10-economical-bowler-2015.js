const fs = require("fs");
const { matchResults, deliveryResults } = require("./readingMatchesCSV");

const getResult = async () => {
  try {
    const deliveryData = await deliveryResults;
    //   console.log(deliveryData);
    const matchData = await matchResults;

    const filteredMatchId = matchData
      .filter((match) => match.season === "2015")
      .reduce((acc, match) => {
        const { id } = match;
        acc.push(id);
        return acc;
      }, []);

    //   console.log(filteredMatchId);

    const bowler_runs_deliveries_list = deliveryData.reduce((acc, delivery) => {
      const { match_id, bowler, total_runs, bye_runs } = delivery;
      if (filteredMatchId[match_id]) {
        if (!acc[bowler]) {
          acc[bowler] = {};
          acc[bowler]["runs_conceded"] = 0;
          acc[bowler]["deliveries_bowled"] = 0;
        }
        acc[bowler]["runs_conceded"] +=
          parseInt(total_runs) - parseInt(bye_runs);
        acc[bowler]["deliveries_bowled"] += 1;
      }
      return acc;
    }, {});
    // console.log(bowler_runs_deliveries_list);

    const bowler_economy_list = Object.entries(bowler_runs_deliveries_list).map(
      ([bowler, { runs_conceded, deliveries_bowled }]) => {
        const no_of_overs = deliveries_bowled / 6;
        const economy = runs_conceded / no_of_overs;
        return {
          bowler,
          economy,
        };
      }
    );
    // console.log(bowler_economy_list);
    bowler_economy_list.sort((a, b) => {
      return a.economy - b.economy;
    });
    const top_10_bowlers = bowler_economy_list.slice(0, 10);
    // console.log(top_10_bowlers);

    const data = JSON.stringify(top_10_bowlers, null, 2);
    fs.writeFile(
      "src/public/output/4-top-10-economical-bowlers-2015.json",
      data,
      "utf-8",
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("File Saved Successfully");
        }
      }
    );
  } catch (error) {}
};

getResult();

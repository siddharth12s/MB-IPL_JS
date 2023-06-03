const fs = require("fs");
const { matchResults } = require("./readingMatchesCSV");

const getResult = async () => {
  const matchData = await matchResults;
  const motm_by_season_list = matchData.reduce((acc, match) => {
    const { season, player_of_match } = match;
    if (!acc[season]) {
      acc[season] = {};
      acc[season][player_of_match] = 1;
    } else {
      if (!acc[season][player_of_match]) {
        acc[season][player_of_match] = 0;
      }
      acc[season][player_of_match] += 1;
    }
    return acc;
  }, {});

  const motm_by_season = {}
  for (const season in motm_by_season_list) {
    const player = motm_by_season_list[season]
    const max_motm_by_season = Object.keys(player).reduce((max_motm, motm) => {
      if (player[motm] > player[max_motm]) {
        return motm
      }
      return max_motm
    })
    motm_by_season[season] = {[max_motm_by_season]: player[max_motm_by_season]}
  }
  // console.log(motm_by_season);
  const data = JSON.stringify(motm_by_season, null, 2);

  fs.writeFile('src/public/output/6-most-motm-by-season.json', data, 'utf-8', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File Saved Successfully");
    }
  })
};

getResult();

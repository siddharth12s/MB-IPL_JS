const strike_rate_by_season = {};
  // for (let season in runs_deliveries_by_season) {
  //   const { runs_scored, deliveries_faced } = runs_deliveries_by_season[season];
  //   const strikeRate = (runs_scored / deliveries_faced) * 100;
  //   strike_rate_by_season[season] = strikeRate;
  // }
  // // console.log(strike_rate_by_season);
  // const data = JSON.stringify(strike_rate_by_season, null, 2);

  // fs.writeFile(
  //   "src/public/output/7-strikeRate_each_season_V_Kohli.json",
  //   data,
  //   "utf-8",
  //   (err) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("File Saved");
  //     }
  //   }
  // );
const fs = require("fs");
const { deliveryResults } = require("./readingMatchesCSV");

const getResult = async () => {
  const deliveryData = await deliveryResults;
  const super_over_bowlers_list = deliveryData.reduce((acc, delivery) => {
    const { is_super_over, bowler, total_runs, bye_runs } = delivery;
    if (is_super_over === "1") {
      if (!acc[bowler]) {
        acc[bowler] = {};
        acc[bowler]["runs_conceded"] = 0;
        acc[bowler]["delivery_bowled"] = 0;
      }
      acc[bowler]["runs_conceded"] += parseInt(total_runs) - parseInt(bye_runs);
      acc[bowler]["delivery_bowled"] += 1;
    }
    return acc;
  }, {});
  // console.log(super_over_bowlers_list);

  let min_econ = Infinity;
  let bowler_name = "";
  for (let bowler in super_over_bowlers_list) {
    const { runs_conceded, delivery_bowled } = super_over_bowlers_list[bowler];
    econ = runs_conceded / delivery_bowled;
    if (econ < min_econ) {
      min_econ = econ;
      bowler_name = bowler;
    }
  }
  // console.log(`Best bowler in super over is ${bowler_name} with economy rate of ${min_econ}`);
  const ans = `Best bowler in super over is ${bowler_name} with economy rate of ${min_econ}`;

  const data = JSON.stringify(ans, null, 2);

  fs.writeFile(
    "src/public/output/9-bowler-with-best-superOver-economy.json",
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
};

getResult();

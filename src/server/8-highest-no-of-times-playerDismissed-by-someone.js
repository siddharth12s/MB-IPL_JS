const fs = require("fs");
const { deliveryResults } = require("./readingMatchesCSV");

const getResult = async () => {
    const deliveryData = await deliveryResults

    const dismissed_player_dismissed_by_list = deliveryData.reduce((acc, delivery) => {
        const { player_dismissed, dismissal_kind, bowler, fielder } = delivery
            if (!acc[player_dismissed]) {
                acc[player_dismissed] = {}
            }
            if (dismissal_kind !== "run out") {
                if (!acc[player_dismissed][bowler]) {
                    acc[player_dismissed][bowler] = 0
                }
                acc[player_dismissed][bowler] += 1
            } else {
                if (!acc[player_dismissed][fielder]) {
                    acc[player_dismissed][fielder] = 0
                }
                acc[player_dismissed][fielder] += 1
            }
        return acc
    }, {})
    // console.log(dismissed_player_dismissed_by_list);
    let most_dismissed_player = ""
    let bowler_dismissing = ""
    let min = 0
    for (let batsman in dismissed_player_dismissed_by_list) {
        if (batsman.trim() === "") {
            continue
        }
        for (let bowler in dismissed_player_dismissed_by_list[batsman]) {
            if (dismissed_player_dismissed_by_list[batsman][bowler] > min) {
                most_dismissed_player = batsman
                bowler_dismissing = bowler
                min = dismissed_player_dismissed_by_list[batsman][bowler]
            }
        }
    }

    // console.log(`Most dismmised player is ${most_dismissed_player} and was dismissed by ${bowler_dismissing} ${min} times`);
    const ans = `Most dismmised player is ${most_dismissed_player} and was dismissed by ${bowler_dismissing} ${min} times`;

    const data = JSON.stringify(ans, null, 2);

    fs.writeFile('src/public/output/8-highest-dismissal-of-player-by-bowler.json', data, 'utf-8', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("File saved successfully");
        }
    })
}

getResult()
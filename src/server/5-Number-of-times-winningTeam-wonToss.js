const fs = require('fs');
const { matchResults } = require('./readingMatchesCSV');

const getResult = async () => {
    const matchData = await matchResults
    const tossWon_matchWon_perTeam = matchData.reduce((acc, match) => {
        const { toss_winner, winner } = match
        if (toss_winner == winner) {
            if (!acc[winner]) {
                acc[winner] = 0
            }
            acc[winner] += 1
        }
        return acc;
    }, {})

    const data = JSON.stringify(tossWon_matchWon_perTeam, null, 2);

    fs.writeFile('src/public/output/5-number-of-times-toss-and-match-won-by-team.json', data, 'utf-8', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("File Saved Successfully");
        }
    })

    console.log(tossWon_matchWon_perTeam);
}

getResult()
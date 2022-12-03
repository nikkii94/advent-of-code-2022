const fs = require('fs');

// A - X: ROCK
// B - Y: PAPER
// C - Z: SCISSORS

const POINTS = {X: 1, Y: 2, Z: 3}
const FINAL_POINTS = {LOST: 0, DRAW: 3, WON: 6};
const FIRST_COMBINATIONS = {
    'A X': POINTS.X + FINAL_POINTS.DRAW,
    'A Y': POINTS.Y + FINAL_POINTS.WON,
    'A Z': POINTS.Z + FINAL_POINTS.LOST,

    'B X': POINTS.X + FINAL_POINTS.LOST,
    'B Y': POINTS.Y + FINAL_POINTS.DRAW,
    'B Z': POINTS.Z + FINAL_POINTS.WON,

    'C X': POINTS.X + FINAL_POINTS.WON,
    'C Y': POINTS.Y + FINAL_POINTS.LOST,
    'C Z': POINTS.Z + FINAL_POINTS.DRAW,
};

// X - LOSE
// Y - DRAW
// Z - WON
const SECOND_COMBINATIONS = {
    'A X': POINTS.Z + FINAL_POINTS.LOST,
    'A Y': POINTS.X + FINAL_POINTS.DRAW,
    'A Z': POINTS.Y + FINAL_POINTS.WON,

    'B X': POINTS.X + FINAL_POINTS.LOST,
    'B Y': POINTS.Y + FINAL_POINTS.DRAW,
    'B Z': POINTS.Z + FINAL_POINTS.WON,

    'C X': POINTS.Y + FINAL_POINTS.LOST,
    'C Y': POINTS.Z + FINAL_POINTS.DRAW,
    'C Z': POINTS.X + FINAL_POINTS.WON,
};

let totalPoints = 0;
let secondRoundTotal = 0;

fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/).forEach(line => {
    if (line in FIRST_COMBINATIONS) {
        totalPoints += +FIRST_COMBINATIONS[line];
    }

    if (line in SECOND_COMBINATIONS) {
        secondRoundTotal += +SECOND_COMBINATIONS[line];
    }
});

console.log(`Total points for first round: ${totalPoints}`);
console.log(`Total points for second round: ${secondRoundTotal}`);

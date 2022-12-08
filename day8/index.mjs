import fs from "fs";

const lines = fs.readFileSync('input.txt', 'utf-8')
    .split(/\r?\n/)
    .filter(line => line.trim())
    .map(row => row.split(''));

const firstRowIndex = 0;
const firstColIndex = 0;
const lastRowIndex = lines.length - 1;
const lastColIndex = lines[0].length - 1;

const getFirstAnswer = () => {
    let visibleTree = 0;

    const checkVisibleHorizontally = (row, startIndex, endIndex, currentTreeIndex) => {
        for (let i = startIndex; i < endIndex; i++) {
            if (row[i] >= row[currentTreeIndex]) {
                return false;
            }
        }

        visibleTree++;

        return true;
    }

    const checkVisibleVertically = (row, startIndex, endIndex, currentTreeIndex) => {
        for (let i = startIndex; i < endIndex; i++) {
            if (lines[i][currentTreeIndex] >= row[currentTreeIndex]) {
                return false;
            }
        }

        visibleTree++;

        return true;
    }

    lines.forEach((row, rowIndex) => {
        if (rowIndex === firstRowIndex || rowIndex === lastRowIndex) {
            visibleTree += row.length;
            return;
        }

        row.forEach((col, colIndex) => {
            if (colIndex === firstColIndex || colIndex === lastColIndex) {
                visibleTree++;

                return;
            }

            if (checkVisibleHorizontally(row, 0, colIndex, colIndex)) {
                return;
            }

            if (checkVisibleHorizontally(row, colIndex + 1, row.length, colIndex)) {
                return;
            }

            if (checkVisibleVertically(row, 0, rowIndex, colIndex)) {
                return;
            }

            checkVisibleVertically(row, rowIndex + 1, lastRowIndex + 1, colIndex);
        })
    })

    return visibleTree;
}

const getSecondAnswer = () => {
    let highest = -Infinity;

    const calcLeftScore = (row, colIndex, currentTree) => {
        let score = 0;
        for (let i = colIndex - 1; i >= 0; i--) {
            score++;
            if (row[i] >= currentTree) {
                break;
            }
        }

        return score;
    }

    const calcRightScore = (row, colIndex, currentTree) => {
        let score = 0;
        for (let i = colIndex + 1; i < row.length; i++) {
            score++;
            if (row[i] >= currentTree) {
                break;
            }
        }

        return score;
    }

    const calcBottomScore = (row, colIndex, rowIndex) => {
        let score = 0;
        for (let i = rowIndex - 1; i >= 0; i--) {
            score++;
            if (lines[i][colIndex] >= lines[rowIndex][colIndex]) {
                break;
            }
        }

        return score;
    }

    const calcTopScore = (row, colIndex, rowIndex) => {
        let score = 0;
        for (let i = rowIndex + 1; i < lines.length; i++) {
            score++;
            if (lines[i][colIndex] >= lines[rowIndex][colIndex]) {
                break;
            }
        }

        return score;
    }

    lines.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const left = calcLeftScore(row, colIndex, col);
            const right = calcRightScore(row, colIndex, col);
            const bottom = calcBottomScore(row, colIndex, rowIndex);
            const top = calcTopScore(row, colIndex, rowIndex);

            highest = Math.max((left * right * top * bottom), highest);
        })
    })

    return highest;
}

console.log(getFirstAnswer());
console.log(getSecondAnswer());

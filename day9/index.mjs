import fs from "fs";

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

const moves = input.map(line => {
    let [direction, step] = line.split(' ');
    return {direction, step: +step};
});

const directions = {
    L: {x: -1, y: 0},
    R: {x: 1, y: 0},
    U: {x: 0, y: -1},
    D: {x: 0, y: 1}
}

const getFirstAnswer = (moves, directions) => {
    const head = {x: 0, y: 0};
    const tail = {x: 0, y: 0};

    const positions = new Set(['0, 0']);

    moves.forEach(({direction, step}) => {
        for (let i = 0; i < step; i++) {
            head.x += directions[direction].x;
            head.y += directions[direction].y;

            let distX = head.x - tail.x;
            let distY = head.y - tail.y;

            if (Math.abs(distX) >= 2) {
                tail.x += Math.sign(distX);

                if (Math.abs(distY) !== 0) {
                    tail.y += Math.sign(distY)
                }

                positions.add(`${tail.x},${tail.y}`);

                continue;
            }

            if (Math.abs(distY) >= 2) {
                tail.y += Math.sign(distY);

                if (Math.abs(distX) !== 0) {
                    tail.x += Math.sign(distX);
                }
            }

            positions.add(`${tail.x},${tail.y}`);
        }
    })

    return positions.size;
}

const getSecondAnswer = (moves, directions) => {
    const body = new Array(10).fill(0).map(() => ({x: 0, y: 0}));

    const positions = new Set(['0,0']);

    moves.forEach(({ direction, step }) => {
        for (let i = 0; i < step; i++) {
            body[0].x += directions[direction].x;
            body[0].y += directions[direction].y;

            for (let j = 1; j < body.length; j++) {
                let distX = body[j - 1].x - body[j].x;
                let distY = body[j - 1].y - body[j].y;

                if (Math.abs(distX) >= 2) {
                    body[j].x += Math.sign(distX);

                    if (Math.abs(distY) !== 0) {
                        body[j].y += Math.sign(distY);
                    }

                    continue;
                }

                if (Math.abs(distY) >= 2) {
                    body[j].y += Math.sign(distY);

                    if (Math.abs(distX) !== 0) {
                        body[j].x += Math.sign(distX);
                    }
                }
            }

            positions.add(`${body[body.length - 1].x},${body[body.length - 1].y}`);
        }
    })

    return positions.size;
}

console.log(getFirstAnswer(moves, directions));
console.log(getSecondAnswer(moves, directions));

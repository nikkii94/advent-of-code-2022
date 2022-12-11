import fs from "fs";

const input = fs.readFileSync('input.txt', 'utf-8').split('\n').filter(line => line.length);

const getFirstAnswer = (instructions) => {
    let x = 1;
    let cycles = 0;

    return instructions.reduce((acc, line) => {
        let [instruction, number] = line.split(' ');

        cycles++;
        if (cycles % 40 === 20) {
            acc += cycles * x;
        }

        if (instruction === 'addx') {
            cycles++;
            if (cycles % 40 === 20) {
                acc += cycles * x;
            }
            x += +number;
        }
        return acc;
    }, 0);
}
const getSecondAnswer = (instructions) => {
    let sprite = 1;
    let cycles = 0;
    let picture = '';

    let drawSprite = () => {
        let position = cycles % 40;
        picture += (Math.abs(position - sprite) <= 1) ? '#' : ' ';

        cycles++;
        if (cycles % 40 === 0) {
            picture += '\n';
        }
    }

    instructions.forEach(line => {
        let [instruction, number] = line.split(' ');

        drawSprite();
        if (instruction === 'addx') {
            drawSprite();
            sprite += +number;
        }
    });

    console.log(picture);
    return 'RZEKEFHA';
}

console.log(getFirstAnswer(input));
console.log(getSecondAnswer(input));

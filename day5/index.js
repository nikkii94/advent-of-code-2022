const fs = require('fs');
const lines = [];
const actions = [];

fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/).forEach(line => {
    lines.push(line);
    if (line.match(/move/g)) {
        actions.push(
            line.replaceAll(/(move|from|to)/g, '')
                .trim()
                .split(' ')
                .filter(v => v !== '')
        );
    }
});

const createStacks = (stackLines) => {
    const stacks = Array(9).fill([]);

    stackLines.reverse().map((line, rowIndex) => {
        return [...line.match(/.{1,4}/g)]
            .map(col => col.replace(/[\[\]]/g, '').trim())
            .forEach((col, colIndex) => {
                if (col !== '') {
                    stacks[colIndex] = [...stacks[colIndex], col];
                }
            });
    });

    return stacks;
}

const stacks = createStacks(lines.slice(0, 8));

const moveCratesOneByOne = () => {
    const finalStacks = [...stacks];

    actions.forEach(([count, fromIndex, toIndex]) => {
        const originalLength = finalStacks[fromIndex - 1].length;
        const insert = [...finalStacks[fromIndex - 1]]
            .reverse()
            .slice(0, count);

        finalStacks[toIndex - 1] = [
            ...finalStacks[toIndex - 1],
            ...insert
        ];

        finalStacks[fromIndex - 1] = finalStacks[fromIndex - 1].slice(0, originalLength - insert.length)
    });

    return finalStacks;
}

const getAnswer = (finalStacks) => {
    return finalStacks.map(stack => {
        return stack.reverse().shift()
    }).join('');
}

const moveMultipleCrates = () => {
    const finalStacks = [...stacks];

    actions.forEach(([count, fromIndex, toIndex]) => {
        const originalLength = finalStacks[fromIndex - 1].length;
        const insert = [...finalStacks[fromIndex - 1]]
            .reverse()
            .slice(0, count);

        finalStacks[toIndex - 1] = [
            ...finalStacks[toIndex - 1],
            ...insert.reverse()
        ];

        finalStacks[fromIndex - 1] = finalStacks[fromIndex - 1].slice(0, originalLength - insert.length)
    });

    return finalStacks;
}

console.log(`First answer: ${getAnswer(moveCratesOneByOne())}`);
console.log(`Second answer: ${getAnswer(moveMultipleCrates())}`);

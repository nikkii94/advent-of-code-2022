import fs from "fs";

const input = fs.readFileSync('input.txt', 'utf-8').split('\n\n');

const monkeys = input.map(lines => {
    let [, start, operation, test, trueCondition, falseCondition] = lines.split('\n');

    const startingNumbers = start.replace('Starting items: ', '').split(', ').map(num => +(num));
    const operationExpression = operation.replace('Operation: new = ', '').trim();
    const divisibleBy = +(test.replace('Test: divisible by ', '').trim());
    const whenTrue = +(trueCondition.replace('If true: throw to monkey ', '').trim());
    const whenFalse = +(falseCondition.replace('If false: throw to monkey ', '').trim());

    return {startingNumbers, operationExpression, divisibleBy, whenTrue, whenFalse, checks: 0};
});

const clone = arr => JSON.parse(JSON.stringify(arr));

const loopMonkeys = (monkeys, rounds = 20, calcWorryLevel) => {
    for (let round = 0; round < rounds; round++) {
        monkeys.forEach(monkey => {
            while(monkey.startingNumbers.length) {
                const worryLevel = calcWorryLevel(monkey);
                monkeys[monkey[(worryLevel % monkey.divisibleBy === 0) ? 'whenTrue' : 'whenFalse']].startingNumbers.push(worryLevel);
                monkey.checks++;
            }
        })
    }
}

const calculateChecks = (monkeys) => {
    const [first, second] = monkeys.sort((a, b) => b.checks - a.checks);

    return first.checks * second.checks;
}

const getFirstAnswer = (monkeys) => {
    loopMonkeys(monkeys, 20, (monkey) => {
        return Math.floor(
            eval(monkey.operationExpression.replace(/old/g, monkey.startingNumbers.shift())) / 3
        )
    });
    return calculateChecks(monkeys);
}

const getSecondAnswer = (monkeys) => {
    const highestValue = monkeys.reduce((acc, {divisibleBy}) => acc *= divisibleBy, 1);
    loopMonkeys(monkeys, 10000, (monkey) => {
        return eval(monkey.operationExpression.replace(/old/g, monkey.startingNumbers.shift())) % highestValue;
    });
    return calculateChecks(monkeys);
}

console.log(getFirstAnswer(clone(monkeys))); // 58322
console.log(getSecondAnswer(clone(monkeys))); // 13937702909

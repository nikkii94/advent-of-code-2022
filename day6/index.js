const fs = require('fs');
const lines = [];
fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/).forEach(line => {
    lines.push(line);
});
const check = (queue, charLength) => {
    const set = new Set([...queue]);

    if (set.size === charLength) {
        console.log(`matched substring: ${[...set].join('')}`)

        return true;
    }

    return false;
}

let fullString = lines.join('').trim();

const getFirstIndexInMessage = (charLength) => {
    let queue = [];
    let index = -1;

    for ( let i=0; i < fullString.length; i++) {
        queue.push(fullString[i]);

        if (i >= charLength) {
            queue = [...queue.slice(1)];
        }

        if (i >= charLength - 1 && check(queue, charLength)) {
            index = i + 1;
            break;
        }
    }

    return index;
}

console.log(getFirstIndexInMessage(4));
console.log(getFirstIndexInMessage(14));

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');

const createDirectories = input => {
    let directories = {'/': {parent: '', files: [], directories: []}};

    let currentDirectory = '';

    const processLine = (line) => {
        if (line.startsWith('$')) {
            handleCommands(line.split(' '));

            return;
        }

        if (line.match(/^dir/)) {
            createDirectory(line.split(' ').pop());

            return;
        }

        if (line.match(/^\d+ \w+/)) {
            console.log(line);
            let [size, fileName] = line.split(' ');
            directories[currentDirectory].files.push({file: fileName, size: parseInt(size)});
        }
    }

    const handleCommands = ([, command, path]) => {
        if (command !== 'cd') {
            return;
        }

        if (path === '/') {
            setToRoot();

            return;
        }

        path === '..' ? setToParentFolder() : setToChildFolder(path);
    }

    const setToRoot = () => {
        currentDirectory = '/';
    }

    const setToParentFolder = () => {
        let paths = currentDirectory.split('/');
        currentDirectory = paths.slice(0, paths.length - 1).join('/');
    }

    const setToChildFolder = (path) => {
        currentDirectory = `${currentDirectory}${currentDirectory !== '/' ? '/' : ''}${path}`;
    }

    const createDirectory = (name) => {
        let newDirectory = `${currentDirectory}${currentDirectory !== '/' ? '/' : ''}${name}`;
        directories[newDirectory] = {
            parent: currentDirectory,
            files: [],
            directories: []
        }
        directories[currentDirectory].directories.push(newDirectory);
    }

    input.split('\n').forEach(processLine);

    return directories;
}

const calculateFirstAnswer = (directories) => {
    const calculateSize = directory => {
        return directories[directory].files.reduce((acc, file) => acc + file.size, 0) +
            directories[directory].directories.reduce((acc, child) => acc + calculateSize(child), 0);
    }

    return Object.keys(directories).reduce((acc, key) => {
        let total = calculateSize(key);
        if (total <= 100000) acc += total;
        return acc;
    }, 0);
}
const calculateSecondAnswer = (directories) => {
    let calculateSize = directory => {
        return directories[directory].files.reduce((acc, file) => acc + file.size, 0) +
            directories[directory].directories.reduce((acc, child) => acc + calculateSize(child), 0);
    }

    let unused = 30000000 - (70000000 - calculateSize('/'));
    let allSizes = Object.keys(directories).map(directory => {
        return calculateSize(directory);
    });

    return allSizes.reduce((lowest, size) => {
        if (size >= unused) return Math.min(lowest, size);
        return lowest;
    }, Infinity);
}

const directories = createDirectories(input);

console.log(calculateFirstAnswer(directories));
console.log(calculateSecondAnswer(directories));

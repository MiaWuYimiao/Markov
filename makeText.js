/** Command-line tool to generate Markov text. */
const axios = require('axios');
const { MarkovMachine } = require("./markov");
const fs = require('fs')
const argv = process.argv;

if(argv[2] === 'file') {
    markovFile(argv[3]);
} else if (argv[2] === 'url') {
    markovWeb(argv[3]);
}
else {
    console.error(`Unknown method: ${argv[2]}`);
    process.exit(1);
}

function markovFile(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if(err) {
            console.error(`Error: Can't read file '${path}'!
             ${err}`);
            process.exit(1);
        }
        let mm = new MarkovMachine(data);
        let txt = mm.makeText();
        console.log(`... generated text from file '${path}' ...
         ${txt}`);
    })
}

async function markovWeb(url) {
    try {
        const res = await axios.get(url);
        let mm = new MarkovMachine(res);
        let txt = mm.makeText();
        console.log(`... generated text from URL '${path}' ...
         ${txt}`);
    } catch (err) {
        console.log(`Error: Can't read URL ${url}:
            ${err}`);
        process.exit(1);
    }
}

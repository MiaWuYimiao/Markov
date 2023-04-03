const { MarkovMachine } = require("./markov");
const fs = require('fs')

describe("Test class MarkovMachine", function () {
    let text;
    beforeEach(function () {
        fs.readFile("eggs.txt", 'utf8', function(err, data) {
            if(err) {
                console.error(err);
                process.exit(1);
            }
            console.log(data)
            text = data;
        })
    })

    test("makeChains", function () {
        let mm = new MarkovMachine(text);
        let chains = mm.chains;
        expect(chains).toEqual(expect.any(Map));
    });

    test('makes chains', function () {
        let mm = new MarkovMachine("aa bb cc aa BB aa BB");
    
        expect(mm.chains).toEqual(new Map([
          ["aa", ["bb", "BB", "BB"]],
          ["bb", ["cc"]],
          ["cc", ["aa"]],
          ["BB", ["aa", null]]]));
        expect(chains).toEqual(expect.any(Map));
      });

})

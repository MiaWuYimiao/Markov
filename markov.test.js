const { MarkovMachine } = require("./markov");
const fs = require('fs')

describe("Test class MarkovMachine", function () {
    // let text;
    // beforeEach(function () {
    //     fs.readFile("eggs.txt", 'utf8', function(err, data) {
    //         if(err) {
    //             console.error(err);
    //             process.exit(1);
    //         }
    //         console.log(data)
    //         text = data;
    //     })
    // })

    // test("makeChains", function () {
    //     let mm = new MarkovMachine(text);
    //     let chains = mm.chains;
    //     expect(chains).toEqual(expect.any(Map));
    // });

    test('makes chains', function () {
        let mm = new MarkovMachine("aa bb cc aa BB aa BB");
    
        expect(mm.chains).toEqual(new Map([
          ["aa", ["bb", "BB", "BB"]],
          ["bb", ["cc"]],
          ["cc", ["aa"]],
          ["BB", ["aa", null]]]));
        expect(mm.chains).toEqual(expect.any(Map));
    });

    test('generates semi-predictable text', function () {
        let mm = new MarkovMachine("a b c");
        let text = mm.makeText();
        expect(["a b c", "b c", "c"]).toContain(text);
    });

    test('generate valid text', function () {
        let mm = new MarkovMachine("the cat in the hat");
        let text = mm.makeText();
        expect(text.endsWith('hat')).toBe(true);

        let bigrams = ["the cat", "cat in", "in the", "the hat", "hat "];
        let textWords = text.split(/[ \r\n]+/);
        for(let i = 0; i < textWords.length-1; i++) {
            expect(bigrams).toContain(textWords[i] + " " + textWords[i+1]);
        }
    });

    test('cuts off at length', function() {
        let bigrams = ["the cat", "cat in", "in the", "the hat", "hat "];
        let mm = new MarkovMachine("the cat in the hat");
        let text = mm.makeText(2);
        let textWords = text.split(/[ \r\n]+/);

        expect([1, 2]).toContain(textWords.length);
    });

})

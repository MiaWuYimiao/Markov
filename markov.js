/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();
    for( let i = 0; i < this.words.length; i++) {
      let key = this.words[i];
      let value = this.words[i+1] || null;
      if( chains.has(key)) {
        chains.get(key).push(value);
      } else {
        chains.set(key, new Array(value))
      }
    }
    this.chains = chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let word = this.words[Math.floor(Math.random()*this.words.length)];
    let res = [];
    while(word !== null && res.length < numWords) {
      res.push(word);
      var items = this.chains.get(word);
      word = items[Math.floor(Math.random()*items.length)];
    }
    return res.join(" ")
  }
}

// let mm = new MarkovMachine("the cat in the hat");
// mm.makeText();


module.exports = {
  MarkovMachine,
};
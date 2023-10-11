class MarkovMachine {
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  makeChains() {
    this.chains = {};

    for (let i = 0; i < this.words.length - 1; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1];

      if (!this.chains[word]) {
        this.chains[word] = [];
      }

      this.chains[word].push(nextWord);
    }
  }

  makeText(numWords = 100) {
    if (!this.chains) {
      console.error("Markov chains have not been built yet. Call makeChains() first.");
      return;
    }

    let currentWord = this.words[Math.floor(Math.random() * this.words.length)]; // Start with a random word.
    let result = [currentWord];

    for (let i = 1; i < numWords; i++) {
      const possibleNextWords = this.chains[currentWord];
      if (!possibleNextWords || possibleNextWords.length === 0) {
        break;
      }

      const nextWord = possibleNextWords[Math.floor(Math.random() * possibleNextWords.length)];
      result.push(nextWord);
      currentWord = nextWord;
    }

    return result.join(" ");
  }
}



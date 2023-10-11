/** Command-line tool to generate Markov text. */

const fs = require('fs');
const https = require('https');
const MarkovMachine = require('./MarkovMachine'); 


function readTextFromFile(filename) {
  try {
    return fs.readFileSync(filename, 'utf-8');
  } catch (error) {
    throw new Error(`Error reading file '${filename}': ${error.message}`);
  }
}


function fetchTextFromURL(url, callback) {
  https.get(url, (response) => {
    if (response.statusCode === 200) {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        callback(data);
      });
    } else {
      throw new Error(`Failed to fetch data from URL '${url}' (Status Code: ${response.statusCode})`);
    }
  }).on('error', (error) => {
    throw new Error(`Error fetching data from URL '${url}': ${error.message}`);
  });
}

if (process.argv.length !== 4) {
  console.log('Usage: node makeText.js [file/url] [filename/url]');
  process.exit(1);
}

const sourceType = process.argv[2];
const source = process.argv[3];

if (sourceType === 'file') {
  const text = readTextFromFile(source);
  const mm = new MarkovMachine(text);
  console.log(mm.makeText());
} else if (sourceType === 'url') {
  fetchTextFromURL(source, (text) => {
    const mm = new MarkovMachine(text);
    console.log(mm.makeText());
  });
} else {
  console.log('Invalid source type. Use "file" or "url".');
  process.exit(1);
}

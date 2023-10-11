const fs = require('fs');
const axios = require('axios');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:\n  ${err.message}`);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

async function webCat(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.error(`Error fetching ${url}:\n  ${error.message}`);
    process.exit(1);
  }
}

const argument = process.argv[2];

if (argument) {
  if (argument.startsWith('http://') || argument.startsWith('https://')) {
    webCat(argument);
  } else {
    cat(argument);
  }
} else {
  console.error('Usage: node step2.js <file-path-or-url>');
}

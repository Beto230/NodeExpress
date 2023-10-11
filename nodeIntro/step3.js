const fs = require('fs');
const axios = require('axios');

function cat(path, outputFilePath) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:\n  ${err.message}`);
      process.exit(1);
    } else {
      if (outputFilePath) {
        writeToFile(outputFilePath, data);
      } else {
        console.log(data);
      }
    }
  });
}

async function webCat(url, outputFilePath) {
  try {
    const response = await axios.get(url);
    const responseData = response.data;
    if (outputFilePath) {
      writeToFile(outputFilePath, responseData);
    } else {
      console.log(responseData);
    }
  } catch (error) {
    console.error(`Error fetching ${url}:\n  ${error.message}`);
    process.exit(1);
  }
}

function writeToFile(outputFilePath, data) {
  fs.writeFile(outputFilePath, data, 'utf8', (err) => {
    if (err) {
      console.error(`Couldn't write ${outputFilePath}:\n  ${err.message}`);
      process.exit(1);
    }
  });
}

const arguments = process.argv.slice(2);
const outFlagIndex = arguments.indexOf('--out');

if (outFlagIndex !== -1) {
  const outputFilePath = arguments[outFlagIndex + 1];
  const remainingArgs = arguments.filter((_, index) => index !== outFlagIndex && index !== outFlagIndex + 1);

  if (remainingArgs.length === 1) {
    cat(remainingArgs[0], outputFilePath);
  } else if (remainingArgs.length === 2 && (remainingArgs[0].startsWith('http://') || remainingArgs[0].startsWith('https://'))) {
    webCat(remainingArgs[0], outputFilePath);
  } else {
    console.error('Usage: node step3.js [--out output-filename.txt] readfile-or-url');
  }
} else {
  const argument = arguments[0];

  if (argument) {
    if (argument.startsWith('http://') || argument.startsWith('https://')) {
      webCat(argument);
    } else {
      cat(argument);
    }
  } else {
    console.error('Usage: node step3.js [--out output-filename.txt] readfile-or-url');
  }
}

const fs = require('fs');

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

const filePath = process.argv[2];

if (filePath) {
  cat(filePath);
} else {
  console.error('Usage: node step1.js <file-path>');
}

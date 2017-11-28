import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

let sd = __dirname;
let rootFolder = path.normalize(sd + '/../');

copyFile(rootFolder, 'src/index.html', 'dist/index.html');


function copyFile(rf, src, dest) {
  let fromFile = fs.createReadStream(path.join(rf, src));
  let toFile = fs.createWriteStream(path.join(rf, dest));
  fromFile.pipe(toFile);
  fromFile.on('end', function() {
     console.log(chalk.green('copied: ' + src));
    });
  fromFile.on('error', function(err) {
    console.log(chalk.red('error: ' + src));
    console.log(err);
  });
}



let express = require('express');
let router = express.Router();
let path = require('path');
let open = require('open');
let fs = require('fs');

const port = 3333;
const app = express();


app.get('/api/data', function(req, res) {
  let contents = fs.readFileSync("data/utilData.json", "utf8");
  let jsonContent = JSON.parse(contents);
  res.json(jsonContent);
});

app.use(express.static(path.join(__dirname, '../dist/')));
//
let filePath = path.join(__dirname, '../dist/') + 'index.html';
app.use((req, res) => res.sendFile(filePath));


app.listen(port, function(err) {
  if (err) {
    console.log(err);
  }
  else {
    open('http://localhost:' + port);
  }
});


const express = require('express')
const bodyParser = require('body-parser');
const log = require('morgan')('dev');
const app = express()

const routes = require('./routes')
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

app.use(log);
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use(routes());

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

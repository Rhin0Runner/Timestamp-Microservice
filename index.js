// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//test - An empty date parameter should return the current time in a JSON object with a unix key
//test - An empty date parameter should return the current time in a JSON object with a utc key
app.get('/api', (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

app.get('/api/:timestamp',(req, res) => {
  const timestamp = req.params.timestamp;

  if(!isNaN(Number(timestamp)) && timestamp.length == 13) {
    return res.json({
      unix: parseInt(timestamp),
      utc: new Date(Number(timestamp)).toUTCString(),
    });
  }

  //test - A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds (as type Number)
  if(new Date(timestamp).toUTCString() != 'Invalid Date') {
    return res.json({
      unix: new Date(timestamp).getTime(),
      utc: new Date(timestamp).toUTCString(),
    });
  }
  //test - If the input date string is invalid, the API returns an object having the structure { error : "Invalid Date" }
  res.json({ error: 'Invalid Date'});
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

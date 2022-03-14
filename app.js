const utility = require("./utility.js");

// Cloud Run Style
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/', (req, res) => {
  _refreshToken(req, res);
});

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const _refreshToken = (req, res) => {
    let token = req.body.token;
    let credentials = req.body.credentials;
    
    utility.refreshToken(token, credentials, function (err, token) {
      if (err) return res.status(500).end(err);
      res.send(token);
    });
  };
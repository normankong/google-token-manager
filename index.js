const utility = require("./utility.js");

// Cloud Function Style
exports.refreshToken = (req, res) => {
  _refreshToken(req, res);
};

const _refreshToken = (req, res) => {
  let token = req.body.token;
  let credentials = req.body.credentials;
  
  utility.refreshToken(token, credentials, function (err, token) {
    if (err) return res.status(500).end(err);
    res.send(token);
  });
};

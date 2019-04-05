var express = require('express');
var router = express.Router();

var dotenv = require('dotenv').config();

var Octokit = require('@octokit/rest');
var octokit = new Octokit({
  auth: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  
  /**
   * Connect to GitHub and get our repositories!
   * Using the paginate endpoint gives us all the repos at once,
   * rather than the manual pagination the listForUser endpoint returns.
   */
  octokit.paginate('GET /users/:username/repos', { username: req.app.locals.username }).then(data => {
    // console.log(data)
    // Render the page
    res.render('index', { title: req.app.locals.name, repos: data });
  })
});

module.exports = router;

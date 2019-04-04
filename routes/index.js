var express = require('express');
var router = express.Router();

var Octokit = require('@octokit/rest');
var octokit = new Octokit();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  /**
   * Connect to GitHub and get our repositories!
   * Using the paginate endpoint gives us all the repos at once,
   * rather than the manual pagination the listForUser endpoint returns.
   */
  octokit.paginate('GET /users/:username/repos', { username: 'pschfr' }).then(data => {
    // console.log(data)
    // Render the page
    res.render('index', { title: 'Repo Management', repos: data });
  })
});

module.exports = router;

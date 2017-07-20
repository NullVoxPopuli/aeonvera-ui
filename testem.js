/*jshint node:true*/
module.exports = {
  "framework": "qunit",
  "test_page": [
    "tests/index.html?filter=acceptance&hidepassed&nocontainer&notrycatch",
    "tests/index.html?filter=!acceptance&hidepassed&nocontainer&notrycatch",
  ],
  "disable_watching": true,
  "launch_in_ci": [
    "PhantomJS"
  ],
  "launch_in_dev": [
    "Firefox"
  ]
};

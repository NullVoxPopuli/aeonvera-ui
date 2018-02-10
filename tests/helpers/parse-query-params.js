import { registerHelper } from '@ember/test';

export default registerHelper('parseQueryParams', function(app, queryString) {
  let params = {};

  // Split into key/value pairs
  params = queryString.replace(/(^\?)/, '').split('&').map(function(n) {return n = n.split('='), this[n[0]] = n[1], this;}.bind({}))[0];

  return params;
});

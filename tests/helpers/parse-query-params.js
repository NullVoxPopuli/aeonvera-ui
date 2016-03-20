import Ember from 'ember';

export default Ember.Test.registerHelper('parseQueryParams', function(app, queryString) {
  var params = {}, queries, temp, i, l;

  // Split into key/value pairs
  params = queryString.replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];

  return params;
});

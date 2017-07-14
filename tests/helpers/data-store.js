import Ember from 'ember';

export default Ember.Test.registerHelper('dataStore', function(app) {
  return app.__container__.lookup('service:store');
});

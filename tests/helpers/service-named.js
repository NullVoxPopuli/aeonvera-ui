import Ember from 'ember';

export default Ember.Test.registerHelper('serviceNamed', function(app, name) {
  return app.__container__.lookup('service:' + name);
});

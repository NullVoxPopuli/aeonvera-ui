import Ember from 'ember';

export default Ember.Test.registerHelper('serviceNamed', function(app, name) {
  return app.container.lookup('service:' + name);
});

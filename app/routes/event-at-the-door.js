import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render('event-at-the-door', {
      into: 'application'
    });
  },
});

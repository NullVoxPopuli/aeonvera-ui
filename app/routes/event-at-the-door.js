import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function () {
    this.render('event-at-the-door', {
      into: 'application',
    });
  },

  model: function(params) {
    return this.store.findRecord('event', params.event_id, {
      include: 'shirts,integrations,competitions,line_items,discounts'
    });
  }
});

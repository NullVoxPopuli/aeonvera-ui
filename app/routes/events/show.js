import Ember from 'ember';

export default Ember.Route.extend({

  renderTemplate: function() {
    this.render('events/show', {
      into: 'dashboard'
    });
  },

  afterModel: function(model, transition) {
    this._super();

    this.set('title', model.get('name'));


    transition.send('setData', model);
    transition.send('setSidebar', 'sidebar/event-sidebar');
  },

  model: function(params) {
    return this.store.find('eventSummary', params.event_id);
  }

});

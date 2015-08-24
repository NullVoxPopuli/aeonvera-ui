import Ember from 'ember';

export default Ember.Route.extend({

  afterModel: function(model, transition){
    this.set('title', model.get('name'));

    var dashboard = this.controllerFor('dashboard');

    dashboard.set('data', model);
    dashboard.set('sidebar', 'sidebar/event-sidebar');
  },

  model: function(params) {
    return this.store.find('event', params.event_id);
  }

});

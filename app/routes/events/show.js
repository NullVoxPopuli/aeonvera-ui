import Ember from 'ember';

export default Ember.Route.extend({

  afterModel: function(model /*, transition */ ) {
    this._super();

    this.set('title', model.get('name'));

    var self = this;
    Ember.run.later(function(){
      var dashboard = self.controllerFor('events/index');
      dashboard.set('data', model);
    });
  },

  model: function(params) {
    return this.store.findRecord('eventSummary', params.event_id, {adapterOptions: {query: { include: 'event_attendances' }}});
  }
});

import Ember from 'ember';

export default Ember.Route.extend({
  afterModel(model /*, transition */) {
    this._super();
    this.set('title', 'Create new Event');

    var dashboard = this.controllerFor('events/index');
    dashboard.set('data', model);
  },

  model() {
    let eventRecord = this.store.createRecord('event');
    let openingTier = this.store.createRecord('opening-tier');

    eventRecord.set('openingTier', openingTier);
    return eventRecord;
  }
});

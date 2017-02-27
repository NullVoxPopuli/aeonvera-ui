import Ember from 'ember';

export default Ember.Route.extend({
  afterModel(model /* , transition */) {
    this._super();
    this.set('title', 'Create new Event');

    const dashboard = this.controllerFor('events/index');

    dashboard.set('data', model);
  },

  model() {
    const eventRecord = this.store.createRecord('event');
    const openingTier = this.store.createRecord('opening-tier');

    eventRecord.set('openingTier', openingTier);
    return eventRecord;
  }
});

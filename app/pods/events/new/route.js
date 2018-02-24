import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    const eventRecord = this.store.createRecord('event');
    const openingTier = this.store.createRecord('opening-tier');
    const eventSettings = this.store.createRecord('event-settings');

    eventRecord.set('openingTier', openingTier);
    eventRecord.set('settings', eventSettings);
    return eventRecord;
  },

  actions: {
    didTransition() {
      this.set('title', 'Create new Event');
      return true;
    }
  }
});

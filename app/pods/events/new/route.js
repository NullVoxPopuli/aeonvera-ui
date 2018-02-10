import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    const eventRecord = this.store.createRecord('event');
    const openingTier = this.store.createRecord('opening-tier');

    eventRecord.set('openingTier', openingTier);
    return eventRecord;
  },

  actions: {
    didTransition() {
      this.set('title', 'Create new Event');
      return true;
    }
  }
});

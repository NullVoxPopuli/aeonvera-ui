import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let event = this.modelFor('events.show');
    let organizations = this.store.findAll('organization');

    return {
      event: event,
      organizations: organizations
    };
  }
});

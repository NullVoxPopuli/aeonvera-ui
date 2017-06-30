import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({

  model: function() {
    const hostId = this.modelFor('my-communities.manage').get('id');
    const hostType = 'Organization';
    // const organization = this.store.findRecord('organization', hostId);

    return RSVP.hash({
      // organization,
      hostId: hostId,
      hostType: hostType
    });
  }
});

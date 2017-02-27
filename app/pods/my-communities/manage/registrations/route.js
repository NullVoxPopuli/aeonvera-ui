import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    const hostId = this.modelFor('my-communities.manage').get('id');
    const hostType = 'Organization';

    return {
      hostId: hostId,
      hostType: hostType
    };
  }
});

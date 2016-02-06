import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    let hostId = this.modelFor("my-communities.manage").get('id');
    let hostType = 'Organization';

    return {
      hostId: hostId,
      hostType: hostType
    };
  }
});

import Ember from 'ember';

export default Ember.Route.extend({
  modelName: 'membership',

  model: function(params) {
    let membership = this.store.createRecord('membership', {});
    let organization = this.modelFor('my-communities.manage');

    return {
      membership: membership,
      organization: organization
    };
  }

});

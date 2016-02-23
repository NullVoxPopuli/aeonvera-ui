import Ember from 'ember';

export default Ember.Route.extend({
  modelName: 'membership-renewal',

  model: function(params) {
    let membership = this.store.createRecord('membership-renewal', {});
    let organization = this.modelFor(
      'my-communities.manage.membership');

    return {
      membership: membership,
      organization: organization
    };
  }

});

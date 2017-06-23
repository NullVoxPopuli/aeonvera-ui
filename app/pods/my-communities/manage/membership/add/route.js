import Ember from 'ember';

export default Ember.Route.extend({
  modelName: 'membership-renewal',

  model: function(params) {
    const membership = this.store.createRecord('membership-renewal', {});
    const organization = this.modelFor(
      'my-communities.manage.membership');


    return {
      membership,
      organization
    };
  }

});

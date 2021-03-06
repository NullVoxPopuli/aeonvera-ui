import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    const id = this.modelFor('my-communities.manage').get('id');

    return this.store.findRecord('organization', id, {
      include: 'membership_options.membership_renewals.membership_option,membership_discounts'
    });
  }

});

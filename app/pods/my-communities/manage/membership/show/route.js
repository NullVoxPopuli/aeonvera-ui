import Ember from 'ember';

const { isBlank } = Ember;

export default Ember.Route.extend({
  model(params) {
    const organization = this.modelFor('my-communities.manage.membership');
    const organizationId = organization.get('id');

    let member = this.store.findRecord('member', params.user_id, {
      organization_id: organizationId,
      include: 'memberships,membership_renewals.membership_options'
    });

    return {
      member,
      organization
    };
  }
});

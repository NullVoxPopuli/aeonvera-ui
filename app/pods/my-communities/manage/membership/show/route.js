import Ember from 'ember';

const { isBlank } = Ember;

export default Ember.Route.extend({
  model(params) {
    const organization = this.modelFor('my-communities.manage.membership');
    const organizationId = organization.get('id');

    const member = this.store.findRecord('member', params.user_id, {
      organization_id: organizationId,
      include: 'memberships,membership_renewals.membership_options'
    });

    const notes = this.store.query('note', {
      host_id: organization.get('id'),
      host_type: organization.get('klass'),
      q: {
        target_id_eq: params.user_id,
        target_type_eq: 'User'
      }
    });

    return {
      member,
      organization,
      notes
    };
  }
});

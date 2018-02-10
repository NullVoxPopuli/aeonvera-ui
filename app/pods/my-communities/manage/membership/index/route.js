import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({

  model() {
    const organization = this.modelFor('my-communities.manage.membership');
    const organizationId = organization.get('id');

    const memberships = this.store.query('membership-renewal', {
      q: { organization_id: organizationId },
      organization_id: organizationId,
      include: 'member,membership_option'
    });

    return RSVP.hash({
      organization,
      memberships
    });
  }
});

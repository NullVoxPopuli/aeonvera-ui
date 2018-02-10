import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class extends Route {
  model(params) {
    const organization = this.modelFor('my-communities.manage');

    return RSVP.hash({
      organization,
      orders: organization.get('recentOrders')
    });
  }
}

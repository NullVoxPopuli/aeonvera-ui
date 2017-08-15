import Ember from 'ember';
import RSVP from 'rsvp';

export default class extends Ember.Route {
  model(params) {
    const organization = this.modelFor('my-communities.manage');

    return RSVP.hash({
      organization,
      orders: organization.get('recentOrders')
    });
  }
}

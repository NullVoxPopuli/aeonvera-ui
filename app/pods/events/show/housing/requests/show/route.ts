import Ember from 'ember';
import RSVP from 'rsvp';

export default class extends Ember.Route {
  model(params, transition) {
    const store = this.get('store');
    const id = params.housingRequestId;

    const housingRequest = store.findRecord('housing-request', id, {
      include: 'registration,housing_provision'
    });

    return RSVP.hash({ housingRequest });
  }
}

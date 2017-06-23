import Ember from 'ember';
import RSVP from 'rsvp';
import findOrder from 'aeonvera/mixins/routes/find-order';

export default Ember.Route.extend(findOrder, {
  model(params, transition) {
    return RSVP.hash({
      order: this._findOrder(params.orderId)
    });
  }
});

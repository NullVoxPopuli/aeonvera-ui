import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import findOrder from 'aeonvera/mixins/routes/find-order';

export default Route.extend(findOrder, {
  model(params, transition) {
    return RSVP.hash({
      order: this._findOrder(params.orderId, transition.queryParams)
    });
  }
});

import Route from '@ember/routing/route';
import { isBlank } from '@ember/utils';
import moment from 'moment';

export default Route.extend({
  // event, registration
  model(params) {
    return this.modelFor('register.event-registration.show');
  },

  afterModel(model) {
    const event = model.event;

    const hasShirts = event.get('shirts.length') > 0;
    const shirtSalesEndAt = event.get('shirtSalesEndAt');
    const areShirtSalesOver = moment().isAfter(shirtSalesEndAt);

    const unpaidOrder = model.registration.get('unpaidOrder');

    const shouldSkipThisPage = (
      !hasShirts || areShirtSalesOver || isBlank(unpaidOrder)
    );

    if (shouldSkipThisPage) {
      // this.transitionTo('register.event-registration.show');
      this.transitionTo('register.event-registration.show.edit.competitions');
    }
  }
});

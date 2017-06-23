import Ember from 'ember';
import moment from 'moment';

const { isBlank } = Ember;

export default Ember.Route.extend({
  // event, registration
  model(params) {
    return this.modelFor('register.event-registration.show');
  },

  afterModel(model) {
    const event = model.event;

    const shirtSalesEndAt = event.get('shirtSalesEndAt');
    const areShirtSalesOver = moment().isAfter(shirtSalesEndAt);

    const unpaidOrder = model.registration.get('unpaidOrder');

    if (areShirtSalesOver || isBlank(unpaidOrder)) {
      this.transitionTo('register.event-registration.show');
    }
  }
});

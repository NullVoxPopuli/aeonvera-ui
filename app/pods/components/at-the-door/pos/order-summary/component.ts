import RSVP from 'rsvp';
import Component from '@ember/component';
import { PropTypes } from 'ember-prop-types';

import { computed, action } from 'ember-decorators/object';

export default class extends Component {
  static propTypes = {
    event: PropTypes.EmberObject.isRequired,
    order: PropTypes.EmberObject.isRequired,
    onRemoveLineItem: PropTypes.func.isRequired,
    onCancelOrder: PropTypes.func.isRequired
  };

  orderComplete: bool = false;

  @computed('order.unconfirmedSubTotal', 'order.calculatedTotal', 'order.isFeeAbsorbed')
  orderTotal(subTotal, total, feeAbsorbed) {
    if (feeAbsorbed) return parseFloat(subTotal);

    return parseFloat(total);
  }

  @action
  async updateRegistration(registration) {
    const order = await this.get('order');

    order.set('registration', registration);

    return order.save();
  }

  @action
  showComplete() {
    // reset stuff
    this.set('showPaymentModal', false);
    this.set('order', null);

    this.get('router').transitionTo('event-at-the-door.payment-success');
  }

  @action
  clearOrder() {

  }

  @action
  async openPayModal() {
    const order = await this.get('order');
    const dirties = await order.get('dirtyOrderLineItems');

    try {
      await RSVP.all(dirties.map(oli => oli.save()));

      this.set('showPaymentModal', true);
    } catch (e) {
      console.log(e);
    }
  }
}

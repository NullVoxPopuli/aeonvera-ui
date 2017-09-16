import RSVP from 'rsvp';
import Component from '@ember/component';
import { PropTypes } from 'ember-prop-types';

import { computed, action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';

export default class extends Component {
  @service('flash-notification') flash;
  static propTypes = {
    event: PropTypes.EmberObject.isRequired,
    order: PropTypes.EmberObject.isRequired,
    onRemoveLineItem: PropTypes.func.isRequired,
    onCancelOrder: PropTypes.func.isRequired
  };

  orderComplete = false;

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

  // this action is intended to be piped to after
  // saving dirty order line items
  @action
  async saveOrder(saveDirtyResult) {
    if (saveDirtyResult === undefined) return;

    const order = await this.get('order');

    try {
      return await order.save();
    } catch (e) {
      this.get('flash').error(e);
    }
  }

  @action
  async saveDirtyOrderLineItems() {
    const order = await this.get('order');
    const dirties = await order.get('dirtyOrderLineItems');

    try {
      return await RSVP.all(dirties.map(oli => oli.save()));
    } catch (e) {
      this.get('flash').error(e);
    }
  }

  // this is action is intended to be piped to after
  // re-saving the order (for getting validations)
  @action
  openPayModal(saveOrderResult) {
    if (saveOrderResult === undefined) return;

    this.set('showPaymentModal', true);
  }
}

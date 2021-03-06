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
    if (registration === null) {
      // TODO: what happens if order doesn't exist?
      return this.set('order.registration', null);
    }

    const order = await this.get('order');

    order.set('registration', registration);
    order.set('buyerName', '');
    order.set('buyerEmail', '');

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
  async onPayButtonClick() {
    return (
      await this.saveDirtyOrderLineItems() &&
      await this.saveOrder()
    );
  }

  async saveOrder() {
    const order = await this.get('order');

    try {
      return await order.save();
    } catch (e) {
      this.get('flash').error(e);
    }
  }

  async saveDirtyOrderLineItems() {
    const order = await this.get('order');
    const dirties = await order.get('dirtyOrderLineItems');

    try {
      return await RSVP.all(dirties.map(oli => oli.save()));
    } catch (e) {
      this.get('flash').error(e);
    }
  }
}

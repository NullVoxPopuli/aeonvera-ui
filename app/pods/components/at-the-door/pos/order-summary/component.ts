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

  @computed('order.subTotal', 'order.total', 'order.isFeeAbsorbed')
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
    this.set('orderComplete', true);
  }

  @action
  clearOrder() {

  }
}
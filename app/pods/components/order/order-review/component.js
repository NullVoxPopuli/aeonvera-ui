import Component from '@ember/component';
import { computed, action } from 'ember-decorators/object';
import { filterBy } from 'ember-decorators/object/computed';

import { PropTypes } from 'ember-prop-types';


export default class extends Component {
  static propTypes = {
    onRemoveOrderLineItem: PropTypes.func
  };

  @filterBy('model.orderLineItems', 'isNew', false) savedLineItems;

  // 1. Fee Exists
  // 2. SubTotal and Total are different
  @computed(
    'model.shouldApplyFee', 'model.fee',
    'model.subTotal', 'model.total', 'model.paid')
  displayFee(shouldApplyFee, fee, subTotal, total, paid) {
    if (parseFloat(subTotal) === parseFloat(total)) return false;

    const result = (paid && fee > 0) || shouldApplyFee;

    return result;
  }

  @action
  onRemoveOrderLineItem(item) {
    item.destroyRecord().then(() => {
      item.get('order.orderLineItems').removeObject(item);
    });
  }
}

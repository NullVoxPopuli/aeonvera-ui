import Component from '@ember/component';
import { PropTypes } from 'ember-prop-types';

import { action } from 'ember-decorators/object';
import { alias } from 'ember-decorators/object/computed';

export default class extends Component {
  static propTypes = {
    order: PropTypes.EmberObject.isRequired,
    item: PropTypes.EmberObject.isRequired
  };

  tagName = 'tr';

  @alias('item.lineItem') lineItem;

  @action
  onRemoveOrderLineItem(item) {
    item.destroyRecord().then(() => {
      item.get('order.orderLineItems').removeObject(item);
    });
  }
}

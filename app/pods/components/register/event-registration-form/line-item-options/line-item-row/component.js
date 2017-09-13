import Ember from 'ember';
import { PropTypes } from 'ember-prop-types';
import { computed, action } from 'ember-decorators/object';
import { alias, notEmpty, not, and, oneWay } from 'ember-decorators/object/computed';

const { isPresent } = Ember;

export default class extends Ember.Component {
  propTypes = {
    lineItem: PropTypes.EmberObject.isRequired,
    order: PropTypes.EmberObject.isRequired,
    addItem: PropTypes.any.isRequired,
    removeItem: PropTypes.any.isRequired
  };

  @oneWay('order.orderLineItems') orderLineItems;
  @and('orderLineItem.id', 'orderLineItem.isPersisted') isAdded;
  @and('orderLineItem.id', 'isAdded', 'orderLineItem.hasDirtyAttributes') needToUpdate;

  @computed('order.orderLineItems.@each.{id,lineItem}', 'lineItem')
  orderLineItem(olis, lineItem) {
    return olis &&
      olis.find(o => o.get('lineItem.id') == lineItem.id &&
                     o.get('lineItem.constructor.modelName').includes('line'));
  }

  @action
  removeExistingItem() {
    const orderLineItem = this.get('orderLineItem');

    this.sendAction('removeItem', orderLineItem);
  }

  @action
  addNewItem() {
    const lineItem = this.get('lineItem');
    const order = this.get('order');
    const params = { order };

    this.sendAction('addItem', lineItem, params);
  }

}

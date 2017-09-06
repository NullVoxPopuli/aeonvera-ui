import Ember from 'ember';
import { computed, action } from 'ember-decorators/object';
import { alias } from 'ember-decorators/object/computed';

import { PropTypes } from 'ember-prop-types';

export default class OrderCartRow extends Ember.Component {
  static propTypes = {
    order: PropTypes.EmberObject.isRequired,
    orderLineItem: PropTypes.EmberObject.isRequired,
    onRemoveLineItem: PropTypes.func.isRequired,
    allowQuantityChange: PropTypes.boolean
  }

  selectedSizeData = null;

  @alias('orderLineItem.lineItem') lineItem;
  @alias('lineItem.isCompetition') isCompetition;
  @alias('lineItem.isShirt') isShirt;
  @alias('lineItem.requiresOrientation') requiresOrientation;
  @alias('lineItem.requiresPartner') requiresPartner;

  @computed('lineItem.code', 'lineItem.name')
  displayName(code, name) { return code || name; }

  @action
  setSize(sizeData) {
    const orderLineItem = this.get('orderLineItem');

    orderLineItem.set('size', sizeData.id);

    this.set('selectedSizeData', sizeData);
  }
}

import Ember from 'ember';
import RSVP from 'rsvp';
import { PropTypes } from 'ember-prop-types';

import { computed } from 'ember-decorators/object';
import { map, alias, filter, filterBy } from 'ember-decorators/object/computed';

import { isA } from 'aeonvera/helpers/is-a';

const { isPresent, isBlank } = Ember;

export default Ember.Component.extend({
  propTypes: {
    order: PropTypes.EmberObject.isRequired,
    shirt: PropTypes.EmberObject.isRequired,
    addShirt: PropTypes.func.isRequired,
    removeShirt: PropTypes.func.isRequired,
    updateShirt: PropTypes.func.isRequired
  },

  selectedSizeData: '',

  @alias('order.orderLineItems') orderLineItems: null,
  @alias('shirt.sizes') sizes: null,

  @filter('orderLineItem', function() {}) shirtOlis: null,

  @filterBy('orderLineItems', 'isDeleted', false) nonDeletedItems: null,

  @computed('nonDeletedItems.@each.{quantity,price}', 'shirt.id')
  subTotal(olis, shirtId) {
    return olis
      .filter(o => o.get('lineItem.id') === shirtId)
      .map(o => o.get('quantity') * o.get('price'))
      .reduce((acc, val) => acc + val, 0);
  },

  @computed('nonDeletedItems.@each', 'sizes', 'shirt')
  availableSizes(olis, sizeDatas, shirt) {
    return olis && sizeDatas.filter(sizeData => {
      // TODO: check type
      const shirtOlis = olis.filter(o => o.get('lineItem.id') === shirt.id);
      const desiredSizes = shirtOlis.map(o => o.get('size'));

      return !desiredSizes.includes(sizeData.size);
    });
  },

  @computed('nonDeletedItems.@each', 'shirt')
  itemsForShirtOption(olis, shirt) {
    return olis && olis.filter(oli => {
      const id = oli.get('lineItem.id');
      const type = oli.get('lineItem.type');
      const idMatches = id == shirt.id;
      const sameType = true;

      return (idMatches && sameType);
    }).sort().reverse();
  },

  actions: {
    updateSize(sizeData) {
      this.set('selectedSizeData', sizeData);
    },

    addNewShirt() {
      const selectedSizeData = this.get('selectedSizeData');
      const shirt = this.get('shirt');
      const order = this.get('order');
      const newSize = selectedSizeData.size;

      if (isBlank(newSize)) return;

      this.sendAction('addShirt', newSize, shirt, order);
      this.set('selectedSizeData', null);
    }
  } // end actions
});

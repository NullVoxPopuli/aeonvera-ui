import Ember from 'ember';
import DS from 'ember-data';

import { computed } from 'ember-decorators/object';

// LineItem also imports:
// - Buyable
// - IsLineItem
// - Purchasable
// - File
import LineItem from '../models/line-item';

const { isEmpty } = Ember;

export default LineItem.extend({
  sizes: DS.attr(),

  @computed('sizes')
  offeredSizes(sizeData) {
    const sizes = [];

    sizeData.forEach(function(data) {
      sizes.push(data.size);
    });

    return sizes.join(', ');
  },

  priceForSize(size) {
    const sizeData = this._sizeDataForSize(size);
    const price = this.get('price');

    return (sizeData && sizeData.price) || price;
  },

  setPriceForSize(size, price) {
    const sizes = this.get('sizes');

    sizes.forEach(function(sizeData) {
      if (sizeData.size === size) {
        sizeData.price = price;
      }
    });
  },

  inventoryForSize(size) {
    const sizeData = this._sizeDataForSize(size);

    return sizeData.inventory || 0;
  },

  purchasedForSize(size) {
    const sizeData = this._sizeDataForSize(size);

    return sizeData.purchased || 0;
  },

  remainingForSize(size) {
    const sizeData = this._sizeDataForSize(size);

    return sizeData.remaining || 0;
  },

  setInventoryForSize(size, inventory) {
    const sizes = this.get('sizes');

    sizes.forEach(sizeData => {
      if (sizeData.size === size) {
        sizeData.inventory = inventory;
      }
    });
  },

  addSize(name, price, inventory) {
    const sizeData = {
      id: name,
      size: name,
      price: price,
      inventory: inventory
    };

    let sizes = this.get('sizes');

    if (isEmpty(sizes)) {
      sizes = Ember.A();
    }

    sizes.pushObject(sizeData);
    this.set('sizes', sizes);
  },

  removeSize(id) {
    const sizes = this.get('sizes');
    const sizeData = sizes.findBy('id', id);

    sizes.removeObject(sizeData);
    this.set('sizes', sizes);
  },

  _sizeDataForSize(size) {
    const sizes = this.get('sizes');

    return sizes.find(sizeData => sizeData.size === size);
  }

});

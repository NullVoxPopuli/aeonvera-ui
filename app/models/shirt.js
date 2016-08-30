import Ember from 'ember';
import DS from 'ember-data';

// LineItem also imports:
// - Buyable
// - IsLineItem
// - Purchasable
// - File
import LineItem from '../models/line-item';

const { isEmpty } = Ember;

export default LineItem.extend({
  sizes: DS.attr(),

  offeredSizes: function () {
    let sizeData = this.get('sizes');
    let sizes = [];

    sizeData.forEach(function (data) {
      sizes.push(data.size);
    });

    return sizes.join(', ');
  }.property('sizes'),

  priceForSize(size) {
    let sizeData = this._sizeDataForSize(size);
    let price = this.get('price');

    return sizeData.price || price;
  },

  setPriceForSize(size, price) {
    let sizes = this.get('sizes');

    sizes.forEach(function (sizeData) {
      if (sizeData.size === size) {
        sizeData.price = price;
      }
    });
  },

  inventoryForSize(size) {
    let sizeData = this._sizeDataForSize(size);
    return sizeData.inventory || 0;
  },

  purchasedForSize(size) {
    let sizeData = this._sizeDataForSize(size);
    return sizeData.purchased || 0;
  },

  remainingForSize(size) {
    let sizeData = this._sizeDataForSize(size);
    return sizeData.remaining || 0;
  },

  setInventoryForSize(size, inventory) {
    let sizes = this.get('sizes');

    sizes.forEach(sizeData => {
      if (sizeData.size === size) {
        sizeData.inventory = inventory;
      }
    });
  },

  addSize(name, price, inventory) {
    let sizeData = {
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
    let sizes = this.get('sizes');
    let sizeData = sizes.findBy('id', id);

    sizes.removeObject(sizeData);
    this.set('sizes', sizes);
  },

  _sizeDataForSize(size) {
    let sizes = this.get('sizes');

    sizes.forEach(sizeData => {
      if (sizeData.size === size) {
        return sizeData;
      }
    });

    return null;
  }

});

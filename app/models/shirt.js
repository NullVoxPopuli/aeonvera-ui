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
  orderLineItems: DS.hasMany('order-line-item'),

  offeredSizes: function () {
    let sizeData = this.get('sizes');
    let sizes = [];

    sizeData.forEach(function (data) {
      sizes.push(data.size);
    });

    return sizes.join(', ');
  }.property('sizes'),

  priceForSize(size) {
    let sizes = this.get('sizes');
    let price = this.get('price');
    sizes.forEach(function (sizeData) {
      if (sizeData.size === size) {
        price = sizeData.price;
      }
    });

    return price;
  },

  setPriceForSize(size, price) {
    let sizes = this.get('sizes');

    sizes.forEach(function (sizeData) {
      if (sizeData.size === size) {
        sizeData.price = price;
      }
    });
  },

  addSize(name, price) {
    let sizeData = {
      id: name,
      size: name,
      price: price
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

});

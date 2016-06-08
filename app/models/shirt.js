import DS from 'ember-data';
import LineItem from '../models/line-item';

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
    let sizes = this.get('sizes');
    let price = this.get('price');
    sizes.forEach(function (sizeData) {
      if (sizeData.size === size) {
        price = sizeData.price;
      }
    });

    return price;
  },

  addSize(name, price) {
    let sizeData = {
      id: name,
      size: name,
      price: price
    };

    this.get('sizes').pushObject(sizeData);
  },

  removeSize(id) {
    let sizes = this.get('sizes');
    let sizeData = sizes.findBy('id', id);

    sizes.removeObject(sizeData);
    this.set('sizes', sizes);
  },

});

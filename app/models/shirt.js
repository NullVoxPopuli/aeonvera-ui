import Ember from 'ember';
import DS from 'ember-data';
import LineItem from '../models/line-item';

export default LineItem.extend({
  sizes: DS.attr(),


  priceForSize: function(size){
    let sizes = this.get('sizes');
    let price = this.get('price');
    sizes.forEach(function(sizeData){
      if (sizeData.size === size){
        price = sizeData.price;
      }
    });
    return price;
  }

});

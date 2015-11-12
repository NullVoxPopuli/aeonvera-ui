import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Mixin.create({
  isDiscount: function() {
    return this.get('constructor.modelName') === 'discount';
  }.property()
});

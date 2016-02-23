import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Mixin.create({
  isDiscount: function() {
    return this.get('constructor.modelName') === 'discount';
  }.property(),

  isShirt: function() {
    return this.get('constructor.modelName') === 'shirt';
  }.property(),

  isCompetition: function() {
    return this.get('constructor.modelName') === 'competition';
  }.property(),
});

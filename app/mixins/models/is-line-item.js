import Ember from 'ember';
import DS from 'ember-data';

const {computed} = Ember;

export default Ember.Mixin.create({
  isDiscount: function() {
    return this.get('constructor.modelName') === 'discount';
  }.property(),

  isCompetition: function() {
    return this.get('constructor.modelName') === 'competition';
  }.property(),

  isMembershipOption: computed(function() {
    return this.get('constructor.modelName') === 'membership-option';
  }),

  isMembershipDiscount: computed(function() {
    return this.get('constructor.modelName') === 'membership-discount';
  }),

  isLesson: computed(function() {
    return this.get('constructor.modelName') === 'lesson';
  }),

  isADiscount: computed(function() {
    return (this.get('isDiscount') || this.get('isMembershipDiscount'));
  }),

  isPackage: computed(function() {
    return this.get('constructor.modelName') === 'package';
  }),

  isShirt: computed(function() {
    return this.get('constructor.modelName') === 'shirt';
  })
});

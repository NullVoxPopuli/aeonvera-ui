import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Mixin.create({
  isA: function(name) {
    return this.get('constructor.modelName') === name;
  },

  isTheSameKindAs(otherObject) {
    const myModelName = this.get('constructor.modelName');
    const otherModelName = otherObject.get('constructor.modelName');

    return (myModelName === otherModelName);
  }
});

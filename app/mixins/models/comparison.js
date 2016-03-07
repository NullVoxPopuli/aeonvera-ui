import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Mixin.create({
  isA: function (name) {
    return this.get('constructor.modelName') === name;
  },

  isTheSameKindAs(otherObject) {
    let myModelName = this.constructor.toString();
    let otherModelName = otherObject.constructor.toString();
    return (myModelName === otherModelName);
  },
});

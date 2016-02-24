import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Mixin.create({
  currentPrice: DS.attr('number'),
});

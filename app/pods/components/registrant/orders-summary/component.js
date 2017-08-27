import Ember from 'ember';

export default Ember.Component.extend({
  lastObject: Ember.computed.alias('model.lastObject')
});

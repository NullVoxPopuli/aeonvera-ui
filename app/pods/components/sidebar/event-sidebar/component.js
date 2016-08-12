import Ember from 'ember';

export default Ember.Component.extend({
  event: Ember.computed.alias('model'),
});

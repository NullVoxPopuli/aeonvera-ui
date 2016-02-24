import Ember from 'ember';

export default Ember.Component.extend({
  community: Ember.computed.alias('model'),
});

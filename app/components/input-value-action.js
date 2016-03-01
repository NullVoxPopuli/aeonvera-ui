import Ember from 'ember';

export default Ember.TextField.extend({
  change: function() {
    let action = this.get('action');
    let value = this.get('value');
    let object = this.get('object');
    return this.sendAction('action', value, object);

  }.observes('value')
});

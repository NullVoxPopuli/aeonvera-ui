import Ember from 'ember';

export default Ember.TextField.extend({
  change: function() {
    const action = this.get('action');
    const value = this.get('value');
    const object = this.get('object');

    return this.sendAction('action', value, object);

  }.observes('value')
});

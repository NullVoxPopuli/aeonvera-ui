import Ember from 'ember';

export default Ember.TextField.extend({
  change: function() {
    // if (name === 'action') {
    let action = this.get('action');
    let value = this.get('value');
    let object = this.get('object');

    return this.sendAction('action', value, object);
    // } else {
    // return this._super.apply(this, arguments);
    // }
  }.observes('value')
});

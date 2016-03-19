import Ember from 'ember';

export default Ember.Component.extend({
  isEvent: Ember.computed('host', function() {
    let host = this.get('host');
    return host.get('constructor.modelName') === 'event';
  }).readOnly(),

});

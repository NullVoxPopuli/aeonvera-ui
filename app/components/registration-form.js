import Ember from 'ember';

export default Ember.Component.extend({
  title: Ember.computed('host.name', function () {
    return 'Register for ' + this.get('host.name');
  }).readOnly(),

  isEvent: Ember.computed('host', function() {
    let host = this.get('host');
    return host.get('constructor.modelName') === 'event';
  }).readOnly(),

});

import Ember from 'ember';

export default Ember.Component.extend({
  isEvent: Ember.computed('host', function() {
    let host = this.get('host');
    if (host.get('isPending')) {
      return host.then(h => {
        return h.get('constructor.modelName') === 'event';
      }, error => {
        // would this ever happen?
        console.log('host not found in registration-form?');
      });
    } else {
      return host.get('constructor.modelName') === 'event';
    }

  }).readOnly(),

  isOrganization: Ember.computed('host', function() {
    let host = this.get('host');
    return host.get('constructor.modelName') === 'organization';
  }).readOnly(),

  isNeither: Ember.computed('isEvent', 'isOrganization', function() {
    return !(this.get('isEvent') || this.get('isOrganization'));
  }).readOnly()

});

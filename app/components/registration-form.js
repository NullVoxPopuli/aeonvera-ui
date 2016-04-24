import Ember from 'ember';

export default Ember.Component.extend({
  isEvent: Ember.computed('host', function() {
    let host = this.get('host');
    if (host.then) {
      return host.then(h => {
        return h.get('constructor.modelName') === 'event';
      });
    }

    return host.get('constructor.modelName') === 'event';
  }).readOnly(),

  isOrganization: Ember.computed('host', function() {
    let host = this.get('host');
    if (host.then) {
      return host.then(h => {
        return h.get('constructor.modelName') === 'organization';
      });
    }

    return host.get('constructor.modelName') === 'organization';
  }).readOnly(),

  isNeither: Ember.computed('isEvent', 'isOrganization', function() {
    return !(this.get('isEvent') || this.get('isOrganization'));
  }).readOnly()

});

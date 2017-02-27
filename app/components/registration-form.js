import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Component.extend({
  host: Ember.computed('order', function() {
    return this.get('order.host');
  }),

  hostObserver: Ember.observer('order', 'order.host.isFulfilled', function() {
    const host = this.get('host');

    this.set('_isEvent', host.get('isEvent'));
    this.set('_isOrganization', host.get('isOrganization'));
  }),

  _isEvent: false,
  _isOrganization: false,

  isEvent: Ember.computed('host', '_isEvent', function() {
    return this.get('_isEvent') ||
           this.get('host.isEvent') ||
           this.get('host.constructor.modelName') === 'event';
  }),

  isOrganization: Ember.computed('host', '_isOrganization', function() {
    return this.get('_isOrganization') ||
           this.get('host.isOrganization') ||
           this.get('host.constructor.modelName') === 'organization';
  }),

  isNeither: Ember.computed('isEvent', 'isOrganization', function() {
    return !(this.get('isEvent') || this.get('isOrganization'));
  })

});

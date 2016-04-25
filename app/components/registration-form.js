import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Component.extend({
  isEvent: Ember.computed('host', function() {
    let promiseObject = this.get('host').asPromiseObject();

    return promiseObject.then(h => {
      return h.get('constructor.modelName') === 'event';
    });
  }).readOnly(),

  isOrganization: Ember.computed('host', function() {
    let promiseObject = this.get('host').asPromiseObject();

    return promiseObject.then(h => {
      return h.get('constructor.modelName') === 'organization';
    });
  }).readOnly(),

  isNeither: Ember.computed('isEvent', 'isOrganization', function() {
    return !(this.get('isEvent') || this.get('isOrganization'));
  }).readOnly()

});

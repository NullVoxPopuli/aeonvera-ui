import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  kind: DS.attr('string'),
  publishableKey: DS.attr('string'),
  owner: DS.belongsTo('host', { polymorphic: true }),

  name: Ember.computed.alias('kind'),

  // only used during the connecting process
  authorizationCode: DS.attr('string')
});

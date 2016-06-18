import Ember from 'ember';
import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  discountAmount: attr('number'),

  sponsor: belongsTo('organization', { polymorphic: true }),
  sponsored: belongsTo('event', { polymorphic: true }),
});

import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  sponsor: belongsTo('organization', { polymorphic: true }),
  sponsored: belongsTo('event', { polymorphic: true }),
  discount: belongsTo('discount', { polymorphic: true })
});

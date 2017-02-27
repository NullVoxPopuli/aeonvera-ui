import DS from 'ember-data';

export default DS.Model.extend({
  value: DS.attr(),

  customField: DS.belongsTo('custom-field'),
  writer: DS.belongsTo('attendance', {polymorphic: true})
});

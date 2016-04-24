import Model from 'ember-data/model';

export default Model.extend({
  value: DS.attr(),

  customField: DS.belongsTo('custom-field'),
  writer: DS.belongsTo('attendance', { polymorphic: true })
});

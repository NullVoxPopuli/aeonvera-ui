import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  label: DS.attr('string'),
  kind: DS.attr('number'),
  defaultValue: DS.attr('string'),
  editable: DS.attr('boolean'),

  host: DS.belongsTo('host', {
    polymorphic: true,
  }),

});

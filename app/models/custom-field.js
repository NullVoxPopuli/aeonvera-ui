import Ember from 'ember';
import DS from 'ember-data';

const { attr, belongsTo, hasMany } = DS;

export default DS.Model.extend({
  label:        attr('string'),
  kind:         attr('number'),
  defaultValue: attr('string'),
  editable:     attr('boolean'),

  host: belongsTo('host', { polymorphic: true }),
  customFieldResponses: hasMany('custom-field-response'),

  //
  // # TODO: is it worth it to make subclasses for all these
  // KIND_TEXT = 0
  // KIND_FORMATTED_TEXT = 1
  // KIND_NUMBER = 2
  // KIND_DATE = 3
  // KIND_TIME = 4
  // KIND_DATETIME = 5
  // KIND_CHECKBOX = 6
  // # TODO: How to store options?
  // KIND_RADIO = 7
  // KIND_RANGE = 8
  // KIND_PHONE = 9

});

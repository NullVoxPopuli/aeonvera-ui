import Ember from 'ember';
import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  title:     attr('string'),
  userName:  attr('string'),
  createdAt: attr('date'),

  host:      belongsTo('host'),

  // fake attributes for creating
  email: attr('string'),
});

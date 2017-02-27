import Ember from 'ember';
import DS from 'ember-data';
import DeletedAt from 'aeonvera/mixins/models/deleted-at';

const {Model, attr, belongsTo} = DS;

export default Model.extend(DeletedAt, {
  note: attr('string'),
  authorName: attr('string'),

  author: belongsTo('user'),
  host: belongsTo('host', {polymorphic: true}),
  target: belongsTo('user', {polymorphic: true})
});

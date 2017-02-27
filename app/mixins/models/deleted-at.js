import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Mixin.create({
  deletedAt: DS.attr('date'),

  isDeleted: function() {
    return Ember.isPresent(this.get('deletedAt'));
  }.property('deletedAt')
});

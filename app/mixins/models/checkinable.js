import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Mixin.create({
  checkedInAt: DS.attr('date'),

  isCheckedIn: function () {
    return Ember.isPresent(this.get('checkedInAt'));
  }.property('checkedInAt'),
});

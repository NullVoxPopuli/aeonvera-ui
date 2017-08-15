import Ember from 'ember';

export default Ember.Component.extend({
  id: Ember.computed(function() {
    return this.get('model.id');
  }),

  eventId: Ember.computed(function() {
    return this.get('model.eventId');
  }),

  name: Ember.computed(function() {
    const model = this.get('model');
    const aName = model.get('attendeeName');
    const name = model.get('name');

    return aName || name;
  })
});

import Ember from 'ember';

export default Ember.Component.extend({
  id: Ember.computed(function () {
    return this.get('model.id');
  }),

  eventId: Ember.computed(function() {
    return this.get('model.eventId');
  }),

  name: Ember.computed(function () {
    let model = this.get('model');
    let aName = model.get('attendeeName');
    let name = model.get('name');

    return aName || name;
  }),
});

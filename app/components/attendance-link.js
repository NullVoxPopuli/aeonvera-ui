import Ember from 'ember';

export default Ember.Component.extend({
  id: function() {
    return this.get('model.id');
  }.property(),

  name: function() {
    let model = this.get('model');
    let aName = model.get('attendeeName');
    let name = model.get('name');

    return aName || name;
  }.property()
});

import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    let level = this.modelFor('events.show.levels.show');
    return level;
  }
});

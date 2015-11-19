import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    let level = this.modelFor('events.show.levels.show');
    // this.store.query('event-attendance', {
    //   level_id: level.get('id')
    // });
    return level;
  }
});

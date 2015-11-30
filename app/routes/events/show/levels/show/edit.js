import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    let level = this.modelFor('events.show.levels.show');
    return level;
  },

  actions: {

    willTransition: function(transition) {

      let dirty = this.get('model.hasDirtyAttributes');
      let model = this.get('controller.content');

      if (dirty && !confirm("Would you like to save your changes?")) {
        model.rollback();
        return true;
      } else {
        model.save();
        return true;
      }

    }
  }
});

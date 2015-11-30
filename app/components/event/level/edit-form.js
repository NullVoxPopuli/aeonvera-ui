import Ember from 'ember';

export default Ember.Component.extend({
  isDirty: function() {
    return !this.get('model.hasDirtyAttributes');
  }.property('model.hasDirtyAttributes'),

  submitTitle: function() {
    if (this.get('isDirty')) {
      return 'Cannot save when there have been no changes';
    } else {
      return 'Save Changes';
    }
  }.property('isDirty'),

  actions: {
    save: function() {
      let model = this.get('model');
      model.save().then(() => {
        this.get('flashMessages').success(
          'Saved Successfully'
        );
      }, failure => {
        this.get('flashMessages').alert(
          'Saving failed: ' + failure
        );
      });

      this.transitionTo('events.show.levels.show', {
        level_id: model.get('id')
      });
    },

    cancel: function() {
      let model = this.get('model');
      model.rollback();
      this.transitionTo('events.show.levels.show');

    },
  }
});

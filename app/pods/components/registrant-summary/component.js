import Ember from 'ember';

export default Ember.Component.extend({

  hasLevel: function() {
    const level = this.get('model.levelName');

    return Ember.isPresent(level);
  }.property('model.levelName')
});

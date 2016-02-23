import Ember from 'ember';

export default Ember.Component.extend({

  hasLevel: function() {
    let level = this.get('model.levelName');
    return Ember.isPresent(level);
  }.property('model.levelName')
});

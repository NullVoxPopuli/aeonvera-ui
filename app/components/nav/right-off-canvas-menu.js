import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),

  tagName: 'aside',
  classNames: ['right-off-canvas-menu'],

  actions: {
    invalidateSession: function() {
      this.get('session').invalidate();
    }
  }
});

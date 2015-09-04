import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'aside',
  classNames: ['right-off-canvas-menu'],


  actions: {
    invalidateSession: function() {
      this.get('session').invalidate();
      localStorage.clear();
    }
  }
});

import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  session: service('session'),

  tagName: 'aside',
  classNames: ['right-off-canvas-menu'],

  actions: {
    invalidateSession: function() {
      this.get('session').invalidate();
    }
  }
});

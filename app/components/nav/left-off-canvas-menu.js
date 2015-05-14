import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'aside',
  classNames: ['left-off-canvas-menu'],

  hasItems: Ember.computed.empty('items'),

  willInsertElement: function() {
    if (this.hasItems) {
      this.sendAction('setLeftMobileMenu', true);
    } else {
      this.sendAction('setLeftMobileMenu', false);
    }
    this._super();
  }
});

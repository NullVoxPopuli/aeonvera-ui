import Ember from 'ember';

export default Ember.Component.extend({
  // passed in
  packages: [],

  // only for this component
  _levelSelection: null,

  actions: {
    selectionChanged(selection) {
      this.sendAction('onSelect', selection);
    }
  }
});

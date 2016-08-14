import Ember from 'ember';

export default Ember.Component.extend({
  // passed in
  packages: [],
  errors: [],

  // only for this component
  _packageSelection: null,

  actions: {
    selectionChanged(selection) {
      this.sendAction('onSelect', selection);
    }
  }
});

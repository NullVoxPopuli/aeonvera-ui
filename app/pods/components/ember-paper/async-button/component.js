import Ember from 'ember';

// https://github.com/miguelcobain/ember-paper/issues/569#issuecomment-262945669
//
// {{loading-button
//   icon='add-box'
//   raised=true
//   label='Add stuff'
//   loadingMessage='Creating stuff...'
//   successMessage='Created stuff'
//   onClick=(action 'createStuff')
// }}
export default Ember.Component.extend({

  tagName: '', // no wrapper

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('promise', undefined);
  },

  actions: {
    onClick() {
      this.set('promise', this.attrs.onClick());
    }
  }
});

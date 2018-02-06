import Ember from 'ember';

// TODO: remove this component...
// defaults taken from
// https://github.com/RSSchermer/ember-spinner-button/blob/master/addon/components/spinner-button.js
// ember-spinner-button does not work later versions of ember
export default Ember.Component.extend({
  tagName: 'button',
  classNames: ['spinner-button'],
  classNameBindings: ['spinning'],
  attributeBindings: ['disabled', 'title'],
  disabled: false,
  title: null,
  isSpinning: false,
  action: null,
  onclick: null,

  click() {
    if (!this.get('isSpinning')) {
      if (this.get('action')) {
        this.sendAction();
      }

      if (typeof this.get('onclick') === 'function') {
        this.get('onclick')();
      }
    }
  }
});

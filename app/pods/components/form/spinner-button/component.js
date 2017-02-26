import Ember from 'ember';

// defaults taken from
// https://github.com/RSSchermer/ember-spinner-button/blob/master/addon/components/spinner-button.js
// ember-spinner-button does not work later versions of ember
export default Ember.Component.extend({
  tagName: 'button',
   classNames: ['spinner-button'],
   classNameBindings: ['spinning'],
   attributeBindings: [ 'disabled', 'title'],
   disabled: false,
   title: null,
   isSpinning: false,
   action: null,
   onclick: null,

  // spin.js config
  lines: 8,
  length: 4,
  radius: 5,
  width: 3,
  direction: 1,
  corners: 1,
  rotate: 0,
  speed: 1,
  trail: 60,
  color: 'white',
  shadow: false,
  hwaccel: false,

  left: '50%',
  top: '50%',

  setPositionToRelative: Ember.on('didInsertElement', function () {
    this.$().css('position', 'relative');
  }),

  maintainButtonDimensions: Ember.on('didInsertElement', Ember.observer('isSpinning', function () {
    if (this.get('isSpinning')) {
      this.$().css({
        'width': this.$().outerWidth() +'px',
        'height': this.$().outerHeight() +'px'
      });
    } else {
      this.$().css({
        'width': '',
        'height': ''
      });
    }
  })),

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

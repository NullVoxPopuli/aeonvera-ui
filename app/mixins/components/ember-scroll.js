import Ember from 'ember';

export default Ember.Mixin.create({
  didInsertElement() {
    this._super(...arguments);
    this._bindScrolling();
  },

  willRemoveElement() {
    this._super(...arguments);
    this._unbindScrolling();
  },

  // To set the debounce, call bindScrolling(debounce: timeInMs);
  // binding scrolling to the window happens automatically.
  // calling this will unset the automatic binding, and reset with
  // the passed in options.
  bindScrolling(opts) {
    this._unbindScrolling();
    this._bindScrolling(opts);
  },

  _bindScrolling(opts = null) {
    let onScroll;
    opts = opts || { debounce: 250 };

    if (opts.debounce) {
      onScroll = _ => Ember.run.debounce(this, this.didScroll, opts.debounce, false);
    } else {
      onScroll = _ => this.didScroll();
    }

    Ember.$(document).bind('touchmove', onScroll);
    Ember.$(window).bind('scroll', onScroll);
  },

  _unbindScrolling() {
    Ember.$(window).unbind('scroll');
    Ember.$(document).unbind('touchmove');
  }
});

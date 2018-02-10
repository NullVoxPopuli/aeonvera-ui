import $ from 'jquery';
import { debounce } from '@ember/runloop';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
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
      onScroll = _ => debounce(this, this.didScroll, opts.debounce, false);
    } else {
      onScroll = _ => this.didScroll();
    }

    $(document).bind('touchmove', onScroll);
    $(window).bind('scroll', onScroll);
  },

  _unbindScrolling() {
    $(window).unbind('scroll');
    $(document).unbind('touchmove');
  }
});

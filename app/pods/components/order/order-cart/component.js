import Ember from 'ember';
import ResizeMixin from 'ember-resize-mixin/main';
import SlotsMixin from 'ember-block-slots';
import computed, { alias } from 'ember-computed-decorators';
import { PropTypes } from 'ember-prop-types';

import EmberScroll from 'aeonvera/mixins/components/ember-scroll';

const { isPresent } = Ember;

export default Ember.Component.extend(ResizeMixin, EmberScroll, SlotsMixin, {
  propTypes: {
    order: PropTypes.EmberObject.isRequired,
    onRemoveLineItem: PropTypes.func.isRequired,
    onCheckout: PropTypes.func.isRequired
  },

  orderContainerClasses: 'large-4 medium-4 columns fixed-to-top-cart fixed-cart-window-to-small',
  cart: Ember.inject.service('order-cart'),
  errors: [],
  resetCheckoutButton: false,
  isProceedToCheckoutVisible: false,
  afterCheckout: null,


  /*
    Debounced triggers ever 100ms

    This is needed because the cart can grow beyond the bounds of the
    window. At best, it needs to be slightly smaller than the height,
    and the tbody needs to be able to scroll.

    the width and height parameters given are the document width and height.
    for this resize, we need to get the height from the window.
  */
  debouncedDidResize: function() {
    this.get('cart')._adjustCartMaxHeight();
    this._updateProceedToCheckoutVisibility();
  }.on('resize'),

  didScroll() {
    this._updateProceedToCheckoutVisibility();
  },

  _updateProceedToCheckoutVisibility() {
    if (this.get('isDestroyed') || this.get('isDestroying')) {
      return;
    }

    this.set('isProceedToCheckoutVisible', this._isCheckoutButtonVisible());
  },

  _isCheckoutButtonVisible() {
    const button = this.$('li.cart-checkout-button-container');

    return this._isElementInViewport(button);
  },

  _isElementInViewport(el) {
    // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
    // get internal element  from jQuery object
    if (Ember.isBlank(el) || el.length === 0) {
      return false;
    }
    el = el[0];

    const rect = el.getBoundingClientRect();
    const isVisible = (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );

    return isVisible;
  },

  @computed('buildingAnOrder')
  itemContainerClasses(building) {
    return building ? 'large-8 medium-8 columns' :
      'large-8 medium-12 columns';
  },

  @computed('order.orderLineItems')
  hasItems(items) {
    return isPresent(items);
  },

  @alias('hasItems') buildingAnOrder,
  @alias('order.orderLineItems') currentItems,

  actions: {
    afterProceedToCheckout() {
      this._updateProceedToCheckoutVisibility();
    },

    checkout() {
      this.sendAction('onCheckout');
    },

    cancel() {
      this.sendAction('afterCancel');
    }
  }

});

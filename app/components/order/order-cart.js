import Ember from 'ember';
import ResizeMixin from 'ember-resize-mixin/main';
import EmberScroll from 'aeonvera/mixins/components/ember-scroll';

export default Ember.Component.extend(ResizeMixin, EmberScroll, {
  cart:                  Ember.inject.service('order-cart'),
  orderContainerClasses: 'large-4 medium-4 columns fixed-to-top-cart fixed-cart-window-to-small',
  errors:                [],
  resetCheckoutButton:   false,
  isProceedToCheckoutVisible: false,

  /*
    Handle optional parameters for editing an order
  */
  didInsertElement() {
    this._super(...arguments);
    let token = this.get('token');
    let order = this.get('order');
    this.set('cart.host', this.get('host'));
    this.set('cart.token', token);
    if (Ember.isPresent(order)) {
      this.set('cart.order', order);
      this.set('cart.email', order.get('userEmail'));
    }
  },

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
    let button = this.$('li.cart-checkout-button-container');
    return this._isElementInViewport(button);
  },

  _isElementInViewport(el) {
    // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
    // get internal element  from jQuery object
    if (Ember.isBlank(el) || el.length === 0) return false;
    el = el[0];

    let rect = el.getBoundingClientRect();
    let isVisible = (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );

    return isVisible;
  },

  itemContainerClasses: Ember.computed('buildingAnOrder', function() {
    let building = this.get('buildingAnOrder');
    return building ? 'large-8 medium-8 columns' :
      'large-8 medium-12 columns';
  }),

  buildingAnOrder: Ember.computed('cart.hasItems', function() {
    return this.get('cart.hasItems');
  }),

  currentItems: Ember.computed('cart.items', function() {
    return this.get('cart.items');
  }),

  order: Ember.computed('cart.order', function() {
    return this.get('cart.order');
  }),

  actions: {
    afterProceedToCheckout() {
      this._updateProceedToCheckoutVisibility();
    },

    checkout() {
      this.set('checkingOut', true);
      let checkoutPromise = this.get('cart').checkout();
      if (checkoutPromise !== undefined) {
        checkoutPromise.then(record => {
          if (record === null) {
            return;
          }

          let id = record.get('id');
          let token = record.get('paymentToken');

          // model hook isn't fired upon transition!
          this.get('router').transitionTo('register.checkout', id, { queryParams: { token: token } });
          this.set('resetCheckoutButton', true);
        }, error => {

          if (Ember.isPresent(error)) {
            this.set('resetCheckoutButton', true);
            this.get('flashMessages').alert(error.message);
          }
        }).finally(() => {
          this.set('checkingOut', false);
        });
      }

      return checkoutPromise;
    },

    removeItem: function(item) {
      this.get('cart').remove(item);
    },

    cancel: function() {
      this.get('cart').cancel();
      this.get('router').transitionTo('register.index');
    },
  },

});

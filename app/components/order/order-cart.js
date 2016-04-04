import Ember from 'ember';
// import ResizeAware from 'ember-resize/mixins/resize-aware';
import ResizeMixin from 'ember-resize-mixin/main';

export default Ember.Component.extend(ResizeMixin, {
  cart: Ember.inject.service('order-cart'),
  orderContainerClasses: 'large-4 medium-4 columns fixed-to-top-cart fixed-cart-window-to-small',
  errors: [],
  resetCheckoutButton: false,

  /*
    Handle optional parameters for editing an order
  */
  didInsertElement() {
    this._super(...arguments);
    let token = this.get('token');
    let order = this.get('order');
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
  debouncedDidResize: function(){
    console.log('watwat');
    let cart = this.$('.fixed-to-top-cart');
    let windowHeight = this.$(window).height();

    // cart might not be rendered right now
    if (cart.length === 0){
      return;
    }

    let cartTop = cart.position().top;
    let cartHeight = cart.height();
    let cartBottom = cartTop + cartHeight;
    let cartTBody = cart.find('tbody');
    let cartTBodyHeight = cartTBody.height();
    let cartUiHeight = cartHeight - cartTBodyHeight;
    let cartUiHeightWithTop = cartUiHeight + cartTop;
    let availableHeight = windowHeight - cartUiHeightWithTop;

    cartTBody.css({maxHeight: availableHeight + 'px'});
  }.on('resize'),

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
    checkout() {
      this.get('cart').checkout().then(record => {
        let id = record.get('id');
        let token = record.get('paymentToken');
        this.get('router').transitionTo('register.checkout', id, { queryParams: { token: token } });
        this.set('resetCheckoutButton', true);
      }, error => {
        // because the checkout request isn't using ember-data,
        // we have to parse the errors ourselves
        let errors = JSON.parse(error.responseText);
        this.set('errors', errors.errors);
        this.set('resetCheckoutButton', true);
      });
    },

    removeItem: function(item) {
      this.get('cart').remove(item);
    },

    cancel: function() {
      this.get('cart').cancel();
    },
  },

});

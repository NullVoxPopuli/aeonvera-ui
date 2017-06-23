import Ember from 'ember';
import config from '../config/environment';
import RandomString from 'aeonvera/mixins/helpers/string';
import computed, { alias, readOnly } from 'ember-computed-decorators';

const { isBlank } = Ember;

export default Ember.Service.extend(RandomString, {
  store: Ember.inject.service('store'),
  session: Ember.inject.service('session'),
  flashMessages: Ember.inject.service('flashMessages'),

  _adjustCartMaxHeight() {
    const cart = jQuery('.fixed-to-top-cart');
    const windowHeight = jQuery(window).height();

    // cart might not be rendered right now
    if (Ember.isBlank(cart) || cart.length === 0) {
      return;
    }

    const cartTop = cart.position().top;
    const cartHeight = cart.height();
    const cartBottom = cartTop + cartHeight;
    const cartTBody = cart.find('tbody');
    const cartTBodyHeight = cartTBody.height();
    const cartUiHeight = cartHeight - cartTBodyHeight;
    const cartUiHeightWithTop = cartUiHeight + cartTop;
    const availableHeight = windowHeight - cartUiHeightWithTop;

    cartTBody.css({ maxHeight: availableHeight + 'px' });
  }
});

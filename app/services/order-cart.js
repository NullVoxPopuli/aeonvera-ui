import Service from '@ember/service';
import { isBlank } from '@ember/utils';

export default Service.extend({
  _adjustCartMaxHeight() {
    const cart = jQuery('.fixed-to-top-cart');
    const windowHeight = jQuery(window).height();

    // cart might not be rendered right now
    if (isBlank(cart) || cart.length === 0) {
      return;
    }

    const cartTop = cart.position().top;
    const cartHeight = cart.height();
    // const cartBottom = cartTop + cartHeight;
    const cartTBody = cart.find('tbody');
    const cartTBodyHeight = cartTBody.height();
    const cartUiHeight = cartHeight - cartTBodyHeight;
    const cartUiHeightWithTop = cartUiHeight + cartTop;
    const availableHeight = windowHeight - cartUiHeightWithTop;

    cartTBody.css({ maxHeight: availableHeight + 'px' });
  }
});

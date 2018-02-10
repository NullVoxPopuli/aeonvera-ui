import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  flash: service('flash-notification'),
  showPaymentInProgress: false,

  queryParams: ['token'],
  token: null,

  actions: {
    // TODO: continue extracting from order/order-checkout?
    //       currently unused
    handleCheckout(checkoutToken) {
      const order = this.get('model.order');
      const paymentToken = this.get('token');

      order.set('checkoutToken', checkoutToken);

      if (paymentToken) order.set('paymentToken', paymentToken);

      this.set('showPaymentInProgress', true);

      order.save({ adapterOptions: { payment_token: paymentToken } })
        .then(() => {
          this.set('showPaymentInProgress', false);
          this.transitionToRoute('register.checkout.thankyou');
        })
        .catch(error => {
          this.get('flash').alert(error);
          this.set('showPaymentInProgress', false);
        });
    }
  }
});

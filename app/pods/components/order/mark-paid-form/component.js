import Ember from 'ember';
import { PropTypes } from 'ember-prop-types';
import { computed, action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';
import { alias } from 'ember-decorators/object/computed';

import { messageFromError } from 'aeonvera/helpers/message-from-error';

const { isPresent, isBlank } = Ember;

export default class extends Ember.Component {
  static propTypes = {
    order: PropTypes.EmberObject.isRequired,
    showOrder: PropTypes.bool,
    afterPayment: PropTypes.func
  };

  @service('authenticated-ajax') ajax;
  @service('flash-notification') flash;

  showOrder = false;

  // set in template via radio buttons
  paymentMethods = {
    // PAYPAL: "PayPal",
    CHECK: 'Check',

    // CREDIT: "Credit",
    // DEBIT: "Debit",
    CASH: 'Cash',
    STRIPE: 'Stripe'
  };
  paymentMethod = 'Cash';
  cashOrCheckAmount = null;
  checkNumber = '';
  notes = '';
  absorbFees = false;

  didReceiveAttrs() {
    this._super(...arguments);

    const userEmail = this.get('order.userEmail');
    const checkoutEmail = this.get('order.checkoutEmail')
    if (isBlank(userEmail) && isBlank(checkoutEmail)) {
      this.set('order.checkoutEmail', 'support@aeonvera.com');
    }
  }

  @alias('order.totalInDollars') orderTotal;

  @computed('cashOrCheckAmount', 'order.subTotal', 'order.total', 'order.isFeeAbsorbed')
  amount = {
    get(enteredAmount, subTotal, total, feeAbsorbed) {
      if (isPresent(enteredAmount)) return parseFloat(enteredAmount);

      if (feeAbsorbed) return parseFloat(subTotal);

      return parseFloat(total);
    },

    set(value) {
      this.set('cashOrCheckAmount', value);
    }
  };

  @computed('amount')
  confirmText = {
    get(amount) {
      if (amount < 0) {
        return `You have given $${Math.abs(amount)}?`;
      }

      return `You have collected $${amount}?`;
    }
  };

  @action
  async markPaid() {
    this.set('showPaymentInProgress', true);
    const flash = this.get('flash');
    const id = this.get('order.id');
    const url = '/api/orders/' + id + '/mark_paid?include=registration';
    const data = {
      payment_method: this.get('paymentMethod'),
      check_number: this.get('checkNumber'),
      amount: this.get('amount'),
      notes: this.get('notes')
    };

    try {
      const responseData = await this.get('ajax').PUT(url, data);

      this.get('store').pushPayload(responseData);
      this.sendAction('afterPayment');
      this.set('showPaymentInProgress', false);
      flash.success('Order was successfully marked as paid.');
    } catch (e) {
      const json = JSON.parse(e.responseText);
      const errors = messageFromError(json);

      flash.alert(errors[0]);
      this.set('showPaymentInProgress', false);
    }

  }

  @action
  async processStripeToken(params) {
    this.set('showPaymentInProgress', true);
    const token = params.id;
    const order = this.get('order');

    order.set('checkoutToken', token);

    // by saving, the server is going to attempt to charge the card,
    //
    // if nothing has gone wrong with the payment
    // and an email will be sent to the registrant.
    //
    // if there are errors with the credit card,
    // the user must be notified
    try {
      const resolvedOrder = await order.asPromiseObject();
      await resolvedOrder.save();

      this.sendAction('afterPayment');
      this.set('showPaymentInProgress', false);
      this.get('flash').success('Order was successfully marked as paid.');
    } catch (e) {
      this.get('flash').alert(e);
      this.set('showPaymentInProgress', false);
    }
  }
}

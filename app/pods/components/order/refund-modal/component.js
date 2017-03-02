import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

const { computed } = Ember;

export default Ember.Component.extend({
  session: Ember.inject.service(),

  order: null, // passed in

  // set in template via radio buttons
  // - 'full'
  // - 'partial'
  refundType: null,
  partialRefundValue: 0,

  modalName: computed('order', {
    get(key) {
      return 'refund-' + this.get('order.id');
    }
  }),

  isRefundPartial: computed('refundType', {
    get(key) {
      return this.get('refundType') === 'partial';
    }
  }),

  isRefundTypeSelected: computed('refundType', {
    get(key) {
      return this.get('refundType') !== null;
    }
  }),

  isRefundButtonEnabled: computed('isRefundTypeSelected', 'partialRefundValue', {
    get(key) {
      const isRefundTypeSelected = this.get('isRefundTypeSelected');
      const refundType = this.get('refundType');
      const partialRefundValue = this.get('partialRefundValue');

      return (
        isRefundTypeSelected && (
          refundType === 'full' || partialRefundValue > 0
        )
      );
    }

  }),

  isRefundButtonDisabled: computed('isRefundButtonEnabled', {
    get(key) {
      return !this.get('isRefundButtonEnabled');
    }
  }),

  actions: {
    refundPayment() {
      const id = this.get('order.id');
      const url = ENV.host + '/api/orders/' + id + '/refund_payment';
      const authToken = this.get('session.data.authenticated.token');

      Ember.$.ajax({
        url: url,
        type: 'PUT',
        data: {
          refund_type: this.get('refundType'),
          partial_refund_amount: this.get('partialRefundValue')
        },
        beforeSend(xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + authToken);
        }
      }).then(data => {
        this.get('store').pushPayload(data);
        this.get('flashMessages').success('Refund Succeeded');
        Ember.$('.close-reveal-modal').click();
      }, error => {
        const json = JSON.parse(error.responseText);
        const errors = json.errors;

        this.get('flashMessages').alert(errors);
      });
    }
  }
});

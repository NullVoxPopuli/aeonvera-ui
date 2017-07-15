import Ember from 'ember';
import { PropTypes } from 'ember-prop-types';

import ENV from 'aeonvera/config/environment';

import { computed, action } from 'ember-decorators/object';
import { equal, not } from 'ember-decorators/object/computed';
import { service } from 'ember-decorators/service';

const FULL_REFUND = 'full';
const PARTIAL_REFUND = 'partial';

export default class extends Ember.Component {
  static propTypes = {
    order: PropTypes.EmberObject.isRequired
  };

  @service('session') session;
  @service('flash-notification') flash;


  // set in template via radio buttons
  // - 'full'
  // - 'partial'
  refundType = null;
  partialRefundValue = 0;

  @equal('refundType', PARTIAL_REFUND) isRefundPartial;
  @equal('refundType', null) isRefundTypeUnselected;
  @not('isRefundTypeUnselected') isRefundTypeSelected;

  @computed('isRefundTypeSelected', 'partialRefundValue', 'refundType')
  isRefundButtonEnabled(isRefundTypeSelected, partialRefundValue, refundType) {
    return (
      isRefundTypeSelected && (
        refundType === 'full' || partialRefundValue > 0
      )
    );
  }

  @not('isRefundButtonEnabled') isRefundButtonDisabled;

  @action
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
      this.get('flash').success('Refund Succeeded');
      Ember.$('.close-reveal-modal').click();
    }, error => {
      const json = JSON.parse(error.responseText);
      const errors = json.errors;

      this.get('flash').alert(errors);
    });
  }
}

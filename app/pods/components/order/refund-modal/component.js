import Ember from 'ember';
import { PropTypes } from 'ember-prop-types';

import ENV from 'aeonvera/config/environment';

import { computed } from 'ember-decorators/object';
import { equal, not } from 'ember-decorators/object/computed';
import { service } from 'ember-decorators/service';

import { dropTask } from 'ember-concurrency-decorators';

const FULL_REFUND = 'full';
const PARTIAL_REFUND = 'partial';

export default class RefundModal extends Ember.Component {
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

  @computed('isRefundTypeSelected', 'partialRefundValue', 'refundType', 'refundPaymentTask.isIdle')
  isRefundButtonEnabled(isRefundTypeSelected, partialRefundValue, refundType, refundIdle) {
    return (
      isRefundTypeSelected && (
        refundType === 'full' || partialRefundValue > 0
      ) && refundIdle
    );
  }

  @not('isRefundButtonEnabled') isRefundButtonDisabled;

  @dropTask
  refundPaymentTask = function * () {
    const id = this.get('order.id');
    const url = `${ENV.host}/api/orders/${id}/refund_payment`;
    const authToken = this.get('session.data.authenticated.token');

    const ajaxOptions = {
      url: url,
      type: 'PUT',
      data: {
        refund_type: this.get('refundType'),
        partial_refund_amount: this.get('partialRefundValue')
      },
      beforeSend(xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + authToken);
      }
    };

    try {
      const data = yield Ember.$.ajax(ajaxOptions);

      this.get('store').pushPayload(data);
      this.get('flash').success('Refund Succeeded');

      this.sendAction('onClose');
    } catch (error) {
      const json = JSON.parse(error.responseText);

      this.get('flash').alert(json);
    }
  }
}

import Ember from 'ember';
import { PropTypes } from 'ember-prop-types';

import ENV from 'aeonvera/config/environment';

import { computed, action } from 'ember-decorators/object';
import { equal, alias, gt, not, or } from 'ember-decorators/object/computed';
import { service } from 'ember-decorators/service';

export default class extends Ember.Component {
  static propTypes = {
    model: PropTypes.EmberObject.isRequired
  };

  @service('session') session;

  orderLineItems = [];

  @equal('model.paymentMethod', 'Stripe') isStripe;
  @alias('model.paid') isPaid;
  @gt('model.paidAmount', 0) hasPaidMoney;

  @not('model.hasLineItems') hasNoLineItems;
  @or('hasNoLineItems', 'model.unpaid') canBeDeleted;

  @action
  resendReceipt() {}

  @action
  delete() {
    const order = this.get('model');

    order.destroyRecord();
    if (this.get('afterDelete')) {
      this.sendAction('afterDelete');
    }
  }

  @action
  refreshStripe() {
    const id = this.get('model.id');
    const url = ENV.host + '/api/orders/' + id + '/refresh_stripe';
    const authToken = this.get('session.data.authenticated.token');

    Ember.$.ajax({
      url: url,
      type: 'GET',
      beforeSend(xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + authToken);
      }
    }).then(data => {
      this.get('store').pushPayload(data);
      this.get('flashMessages').success('Stripe Data Refreshed');
    }, error => {
      const json = JSON.parse(error.responseText);
      const errors = json.errors;

      this.get('flashMessages').alert(errors);
    });
  }
}

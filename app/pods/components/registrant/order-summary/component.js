import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

export default Ember.Component.extend({
  session: Ember.inject.service(),

  orderLineItems: [],

  actions: {
    resendReceipt() {

    },

    delete() {
      const order = this.get('model');

      order.destroyRecord();
      if (this.get('afterDelete')) {
        this.sendAction('afterDelete');
      }
    },

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
});

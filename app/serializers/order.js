import DS from 'ember-data';
import EmbeddedRecords from 'aeonvera/mixins/serializers/embedded-records';
import ApplicationSerializer from 'aeonvera/serializers/application';

export default ApplicationSerializer.extend(EmbeddedRecords, {
  // attrs: {
  //   orderLineItems: { embedded: 'always' }
  // },

  serialize(snapshot, options) {
    let json = this._super(...arguments);

    const paymentToken = json.data.attributes['payment-token'];

    if (paymentToken) {
      json.payment_token = paymentToken;
    }

    return json;
  }
});

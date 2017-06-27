import DS from 'ember-data';
import ApplicationSerializer from 'aeonvera/serializers/application';

export default ApplicationSerializer.extend({
  serialize(snapshot, options) {
    const json = this._super(...arguments);

    const paymentToken = json.data.attributes['payment-token'];

    console.log(json.data)
    if (paymentToken) {
      json.payment_token = paymentToken
    }

    return json;
  }
});

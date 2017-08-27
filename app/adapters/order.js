import ApplicationAdapter from 'aeonvera/adapters/application';

export default ApplicationAdapter.extend({

  // WARNING: this is a private api that is being overridden
  //          be careful with upgrades
  urlForDeleteRecord(id, modelName, snapshot) {
    let url = this._buildURL(modelName, id);

    const adapterOptions = snapshot.adapterOptions;

    if (adapterOptions && adapterOptions.payment_token) {
      url += `?payment_token=${adapterOptions.payment_token}`;
    }

    return url;
  },

  urlForUpdateRecord(id, modelName, snapshot) {
    let url = this._buildURL(modelName, id);
    const adapterOptions = snapshot.adapterOptions;
    const paymentToken = adapterOptions && adapterOptions.payment_token;

    if (paymentToken) {
      url += `?payment_token=${paymentToken}`;
    }

    return url;
  }
});

import ApplicationAdapter from 'aeonvera/adapters/application';

export default ApplicationAdapter.extend({

  // WARNING: this is a private api that is being overridden
  //          be careful with upgrades
  urlForDeleteRecord(id, modelName, snapshot) {
    let url = this._buildURL(modelName, id);
    const record = this.get('store').peekRecord(modelName, id);

    const eventId = record.get('host.id');
    url += `?event_id=${eventId}`;

    return url;
  },

  // urlForUpdateRecord(id, modelName, snapshot) {
  //   let url = this._buildURL(modelName, id);
  //   const paymentToken = snapshot.adapterOptions.payment_token;
  //
  //   if (paymentToken) {
  //     url += `?payment_token=${paymentToken}`;
  //   }
  //
  //   return url;
  // }
});

import ApplicationSerializer from 'aeonvera/serializers/application';

export default ApplicationSerializer.extend({

  // normalizeResponse(store, primaryModelClass, payload, id, requestType) {
  normalize(modelClass, resourceHash) {
    const json = this._super(...arguments);

    const name = json.data.attributes.name;
    const code = json.data.attributes.code;

    if (code === undefined && name !== undefined) {
      json.data.attributes.code = name;
    }

    return json;
  }
});

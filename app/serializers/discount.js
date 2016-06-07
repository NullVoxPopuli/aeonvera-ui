import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({

  // normalizeResponse(store, primaryModelClass, payload, id, requestType) {
  normalize(modelClass, resourceHash) {
    var json = this._super(...arguments);

    let name = json.data.attributes.name;
    let code = json.data.attributes.code;

    if (code === undefined && name !== undefined) {
      json.data.attributes.code = name;
    }

    return json;
  }
});

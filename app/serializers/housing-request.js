import JSONAPISerializer from 'ember-data/serializers/json-api';
import ApplicationSerializer from 'aeonvera/serializers/application';

export default ApplicationSerializer.extend({
  serialize(snapshot, options) {
    var json = this._super(...arguments);

    json.data.attributes['requested-roommates'] = [
      json.data.attributes.requested1,
      json.data.attributes.requested2,
      json.data.attributes.requested3,
      json.data.attributes.requested4,
    ];

    json.data.attributes['unwanted-roommates'] = [
      json.data.attributes.unwanted1,
      json.data.attributes.unwanted2,
      json.data.attributes.unwanted3,
      json.data.attributes.unwanted4,
    ];

    delete json.data.attributes.requested1;
    delete json.data.attributes.requested2;
    delete json.data.attributes.requested3;
    delete json.data.attributes.requested4;

    delete json.data.attributes.unwanted1;
    delete json.data.attributes.unwanted2;
    delete json.data.attributes.unwanted3;
    delete json.data.attributes.unwanted4;

    return json;
  },

  // normalizeResponse(store, primaryModelClass, payload, id, requestType) {
  normalize(modelClass, resourceHash) {
    var json = this._super(...arguments);

    let requested = json.data.attributes.requestedRoommates || [];
    let unwanted = json.data.attributes.unwantedRoommates || [];

    json.data.attributes.requested1 = requested[0];
    json.data.attributes.requested2 = requested[1];
    json.data.attributes.requested3 = requested[2];
    json.data.attributes.requested4 = requested[3];

    json.data.attributes.unwanted1 = unwanted[0];
    json.data.attributes.unwanted2 = unwanted[1];
    json.data.attributes.unwanted3 = unwanted[2];
    json.data.attributes.unwanted4 = unwanted[3];

    delete json.data.attributes.requestedRoommates;
    delete json.data.attributes.unwantedRoommates;

    return json;
  }
});

import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({

  serialize(snapshot, options) {
    let json = this._super(...arguments);
    let attributes = json.data.attributes;
    let sizes = attributes.sizes;

    let sizeDatas = [];

    // This converts the Ember objects to a POJO
    sizes.forEach((sizeData) => {
      sizeDatas.push({
        size: sizeData.size,
        price: sizeData.price
      });
    });

    json.data.attributes.sizes = sizeDatas;

    return json;
  }
});

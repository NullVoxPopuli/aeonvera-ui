import Ember from 'ember';
import JSONAPISerializer from 'ember-data/serializers/json-api';

const { isEmpty, isPresent } = Ember;

export default JSONAPISerializer.extend({

  serialize(snapshot, options) {
    let json = this._super(...arguments);
    let attributes = json.data.attributes;
    let sizes = attributes.sizes;

    let sizeDatas = [];

    if (isEmpty(sizes)) {
      return json;
    }

    // This converts the Ember objects to a POJO
    sizes.forEach((sizeData) => {
      sizeDatas.push({
        size: sizeData.size,
        price: sizeData.price,
        inventory: sizeData.inventory
      });
    });

    json.data.attributes.sizes = sizeDatas;

    return json;
  }
});

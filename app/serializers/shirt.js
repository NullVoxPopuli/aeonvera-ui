import Ember from 'ember';
import JSONAPISerializer from 'ember-data/serializers/json-api';
import ApplicationSerializer from 'aeonvera/serializers/application';

const { isEmpty, isPresent } = Ember;

export default ApplicationSerializer.extend({

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

import DS from 'ember-data';
import ApplicationSerializer from 'aeonvera/serializers/application';

export default ApplicationSerializer.extend({
  serialize(snapshot, options) {
    const json = this._super(...arguments);

    return json;
  }
});

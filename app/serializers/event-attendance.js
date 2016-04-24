import DS from 'ember-data';
import EmbeddedRecords from 'aeonvera/mixins/serializers/embedded-records';

export default DS.JSONAPISerializer.extend(EmbeddedRecords, {
  attrs: {
    housingRequest: { embedded: 'always' },
    housingProvision: { embedded: 'always' }
  }
});

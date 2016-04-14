import DS from 'ember-data';
import EmbeddedRecords from 'aeonvera/mixins/serializers/embedded-records';

export default DS.JSONAPISerializer.extend(EmbeddedRecords, {
  attrs: {
    attendance: { embedded: 'always' },
    orderLineItems: { embedded: 'always' },
  }
});

import DS from 'ember-data';
import EmbeddedRecords from 'aeonvera/mixins/serializers/embedded-records';
import ApplicationSerializer from 'aeonvera/serializers/application';

export default ApplicationSerializer.extend(EmbeddedRecords, {
  attrs: {
    openingTier: { embedded: 'always' }
  }
});

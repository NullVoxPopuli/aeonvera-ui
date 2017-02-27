import EmbeddedRecords from 'aeonvera/mixins/serializers/embedded-records';
import ApplicationSerializer from 'aeonvera/serializers/application';

export default ApplicationSerializer.extend(EmbeddedRecords, {
  attrs: {
    housingRequest: {embedded: 'always'},
    housingProvision: {embedded: 'always'},
    customFieldResponses: {embedded: 'always'}
  }
});

import DS from 'ember-data';
import ENV from "../config/environment";
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
//
// export default DS.ActiveModelAdapter.extend(DataAdapterMixin, {
//   namespace: 'api',
//   host: ENV.host,
//   authorizer: 'authorizer:application'
// });
export default  DS.RESTAdapter.extend();

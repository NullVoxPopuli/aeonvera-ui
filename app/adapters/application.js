import DS from 'ember-data';
import ENV from "../config/environment";
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
console.log(ENV.host);
export default  DS.RESTAdapter.extend(DataAdapterMixin, {
  namespace: 'api',
  host: ENV.host,
  authorizer: 'authorizer:application'
});

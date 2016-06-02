import Ember from 'ember';
import DS from 'ember-data';
import ENV from '../config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  namespace: 'api',
  host: ENV.host,
  authorizer: 'authorizer:token',

  urlForDeleteRecord(id, modelName, snapshot) {
    let password = snapshot.adapterOptions.password;
    return this._super(...arguments) + '?password=' + password;
  }
});

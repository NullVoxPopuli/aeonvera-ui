import Ember from 'ember';
import DS from 'ember-data';
import ENV from '../config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  namespace: 'api',
  host: ENV.host,
  authorizer: 'authorizer:token',
  coalesceFindRequests: true,

  pathForType: function (type) {
    let underscored = Ember.String.underscore(type);
    return Ember.String.pluralize(underscored);
  },

  urlForFindRecord(id, modelName, snapshot) {
    let url = this._super(...arguments);
    let query = Ember.get(snapshot, 'adapterOptions.query');
    if (query) {
      url += '?' + Ember.$.param(query);
    }

    return url;
  },

});

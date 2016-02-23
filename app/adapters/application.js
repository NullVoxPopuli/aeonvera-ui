import Ember from 'ember';
import DS from 'ember-data';
import ENV from "../config/environment";
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

console.log(ENV.host);

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  namespace: 'api',
  host: ENV.host,
  authorizer: 'authorizer:application',
  coalesceFindRequests: true,

  pathForType: function(type) {
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
  // findHasMany: function(store, snapshot, url, relationship) {
  //   var id = snapshot.id;
  //   var type = snapshot.typeKey;
  //
  //   url = this.urlPrefix(url, this.buildURL(type, id));
  //
  //   if ('params' in relationship.options) {
  //     var params = snapshot.attr(relationship.options.params);
  //     if (params && Ember.keys(params).length) {
  //       var queryParams = [];
  //       _.forEach(params, function(value, key) {
  //         queryParams.push(
  //           '%@=%@'.fmt(encodeURIComponent(key), encodeURIComponent(
  //             value))
  //         );
  //       });
  //       url = url + '?' + queryParams.join('&');
  //     }
  //   }
  //
  //   return this.ajax(url, 'GET');
  // },
});

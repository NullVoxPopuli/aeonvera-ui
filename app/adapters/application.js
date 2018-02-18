import $ from 'jquery';
import { get } from '@ember/object';
import { underscore } from '@ember/string';
import Ember from 'ember';
import DS from 'ember-data';
import ENV from '../config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

import { pluralize } from 'ember-inflector';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  namespace: 'api',
  host: ENV.host,
  authorizer: 'authorizer:token',
  coalesceFindRequests: true,

  pathForType: function(type) {
    const underscored = underscore(type);

    return pluralize(underscored);
  },

  urlForFindRecord(id, modelName, snapshot) {
    let url = this._super(...arguments);
    const query = get(snapshot, 'adapterOptions.query');

    if (query) {
      url += '?' + $.param(query);
    }

    return url;
  }

});

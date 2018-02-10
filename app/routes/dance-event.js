import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  subdomain: service('subdomain'),

  model: function() {
    return this.get('subdomain.model');
  },

  afterModel: function() {
    const model = this.get('model');
    const sub = this.get('subdomain');

    if (isEmpty(model)) {
      // TODO: probably want to remove the subdomain before redirecting
      location.href = sub.get('withoutSubdomain');
    }
  }
});

import Ember from 'ember';

export default Ember.Route.extend({
  subdomain: Ember.inject.service('subdomain'),

  model: function() {
    return this.get('subdomain.model');
  },

  afterModel: function() {
    // TODO: extract this to a mixin, "Requires SubDomain"
    const sub = this.get('subdomain');
    const model = sub.get('model');

    if (Ember.isEmpty(model)) {
      // TODO: probably want to remove the subdomain before redirecting
      location.href = sub.get('withoutSubdomain');
    }
  }
});

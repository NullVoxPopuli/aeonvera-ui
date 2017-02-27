import Ember from 'ember';

export default Ember.Route.extend({
  subdomain: Ember.inject.service('subdomain'),

  model: function() {
    return this.get('subdomain.model');
  },

  afterModel: function() {
    const model = this.get('model');
    const sub = this.get('subdomain');

    if (Ember.isEmpty(model)) {
      // TODO: probably want to remove the subdomain before redirecting
      location.href = sub.get('withoutSubdomain');
    }
  }
});

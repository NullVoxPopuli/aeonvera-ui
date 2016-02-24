import Ember from 'ember';

export default Ember.Route.extend({
  subdomain: Ember.inject.service('subdomain'),

  model: function () {
    return this.get('subdomain.model');
  },

  afterModel: function () {
    // TODO: extract this to a mixin, "Requires SubDomain"
    let sub = this.get('subdomain');
    let model = sub.get('model');
    console.log(model);
    if (Ember.isEmpty(model)) {
      // TODO: probably want to remove the subdomain before redirecting
      location.href = sub.get('withoutSubdomain');
    }
  },
});

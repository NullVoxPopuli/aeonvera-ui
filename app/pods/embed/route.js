import Ember from 'ember';

export default Ember.Route.extend({
  // This feels really hacky...
  beforeModel(transition) {
    const target = transition.params.embed.subdomain;

    window.location.pathname = target;
    transition.abort();
  }
});

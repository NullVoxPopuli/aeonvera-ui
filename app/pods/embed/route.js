import Ember from 'ember';

export default Ember.Route.extend({
  // This feels really hacky...
  beforeModel(transition) {
    let target = transition.params.embed.subdomain;
    window.location.pathname = target;
    transition.abort();
  }
});

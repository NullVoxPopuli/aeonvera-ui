import Route from '@ember/routing/route';

export default Route.extend({
  // This feels really hacky...
  beforeModel(transition) {
    const target = transition.params.embed.subdomain;

    window.location.pathname = target;
    transition.abort();
  }
});

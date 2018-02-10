import Route from '@ember/routing/route';

export default Route.extend({
  redirect: function() {
    localStorage.clear();
    this.transitionTo('welcome');
  }
});

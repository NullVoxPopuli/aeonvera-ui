import Route from '@ember/routing/route';

export default Route.extend({
  showMyEvents: false,

  model: function() {
    return this.store.findAll('hosted-event');
  }
});

import Ember from 'ember';

export default Ember.Controller.extend({
  showMyEvents: false,

  /*
    TODO: make the checkbox call an action and then
    move this logic to the route
  */
  filteredModel: function() {
    const store = this.store;
    const onlyMe = this.get('showMyEvents');

    if (onlyMe) {
      const promise = store.filter('hosted-event', function(e) {
        return e.get('myEvent');
      });

      return promise;
    }
    return store.findAll('hosted-event');

  }.property('model.[]', 'showMyEvents')

});

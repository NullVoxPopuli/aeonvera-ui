import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({

  model: function() {
    return this.store.findAll('attended-event');
  }
});

import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({

  activate: function() {
    this.set('title', this.t('attendedevents'));

    this.controllerFor('application').set('mobileMenuLeft', 'nav/dashboard/left-items');

    this._super();
  },


  model: function() {
    return this.store.findAll('attended-event');
  }
});

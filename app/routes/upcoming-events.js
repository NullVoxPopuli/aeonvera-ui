import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    this.set('title', this.t('upcomingevents'));

    var application = this.controllerFor('application');
    application.set('mobileMenuLeft', 'nav/dashboard/left-items');
    application.set('mobileMenuRight', 'nav/dashboard/right-items');

    this._super();
  },

  model: function(){
    return this.store.findAll('upcoming-event');
  }
});

import Ember from 'ember';

export default Ember.Route.extend({

  activate: function() {
    this.set('title', this.t('attendedevents'));

    this.controllerFor('application').set('mobileMenuLeft',
      'nav/dashboard/left-items');

    this._super();
  },

  /**
    Redirect to the welcome route if not logged in.
    TODO: extract this to a mixin
  */
  beforeModel: function(transition) {
    if (!this.get('session').isAuthenticated) {
      transition.abort();

      // don't show this message, as people just navigating to
      // aeonvera.com would see it.
      // but we want the dashboard to be the default URL
      // Ember.get(this, 'flashMessages').warning(
      // 'You must be logged in to view the dashboard');

      this.transitionTo('welcome');
    }
  },

  actions: {
    updateCurrentUser: function(){
      var store = this.get('store');

      store.find('user', 0).then(function(user){
        user.save();
      });
    },

    deactivateAccount: function(){
      var store = this.get('store');
      var self = this;

      store.find('user', 0).then(function(user){
        user.deleteRecord();
        user.save().then(function(){
          self.send('invalidateSession');
        });
      });
    }
  }
});

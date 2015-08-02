import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service(),

  navigation: 'fixed-top-nav',
  mobileMenuLeft: 'nav/welcome/left-items',
  mobileMenuRight: 'nav/welcome/right-items',

  init: function() {
    var store = this.get('store');
    this.set('user', store.createRecord('user'));
  },

  actions: {
    /**
      Create new account / new user.
    */
    registerNewUser: function(model) {
      var user = this.get('user');

      user.save().then(
        function() {
          /*
            success
            - hide the modal
            - notify of confirmation email
          */
        },
        function() {
          /*
            error
            - show error messages
          */
        }
      );
    }
  }

});

import Ember from 'ember';

export default Ember.Controller.extend({
  navigation: 'fixed-top-nav',
  mobileMenuLeft: 'nav/welcome/left-items',
  mobileMenuRight: 'nav/welcome/right-items',

  actions: {

    transitionToLoginRoute() {
      this.transitionToRoute('login');
    },

    newUserRegistered() {
      /*
        success
        - hide the modal
        - notify of confirmation email
      */
      this.get('flashMessages').success(
        'You will receive an email with instructions about how to confirm your account in a few minutes.'
      );

      jQuery('#signup-modal a.close-reveal-modal').trigger('click');
    }
  }

});

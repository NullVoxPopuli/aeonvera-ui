import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Controller.extend({
  flashMessages: service('flash-notification'),
  session: service('session'),
  showSidebar: true,

  actions: {

    transitionToLoginRoute() {
      this.transitionToRoute('login');
    },

    logoutAndRedirect() {
      this.get('session').invalidate();
      this.transitionToRoute('welcome');
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

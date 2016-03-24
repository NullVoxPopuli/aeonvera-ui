import Ember from 'ember';
const {
  service,
} = Ember.inject;

export default Ember.Component.extend({
  session: service('session'),
  flashMessages: Ember.inject.service(),

  showErrorMessage: function () {
    let msg = this.get('errorMessage');
    return Ember.isBlank(msg) ? 'error-message-hidden' : '';
  }.property('errorMessage'),

  actions: {
    authenticate: function () {
      let credentials = this.getProperties('identification', 'password');

      this.get('session').authenticate('authenticator:token', credentials)
        .then(json => {

          // close the modal
          Ember.$('a.close-reveal-modal').trigger('click');

          // yay
          this.get('flashMessages').success(
            'You have successfully logged in');
        }, error => {

          let message = error;
          let reasonType = typeof (message);

          if (reasonType === 'string') {
            // in case rails throws the standard error text at us
            message = message.split('\n')[0];
          } else if (reasonType === 'object') {
            // normal auth errors
            message = error.error;
          }

          this.set('errorMessage', message);
        });
    },

    hideError: function () {
      this.set('errorMessage', '');
    },
  },
});

import Ember from 'ember';
const {
  service,
} = Ember.inject;

export default Ember.Component.extend({
  session: service('session'),

  showErrorMessage: function () {
    let msg = this.get('errorMessage');
    return Ember.isBlank(msg) ? 'error-message-hidden' : '';
  }.property('errorMessage'),

  actions: {
    authenticate: function () {
      let self = this;
      let {
        identification, password,
      } = this.getProperties('identification', 'password');
      this.get('session').authenticate(
          'authenticator:devise', identification, password)
        .catch(function (reason) {
          let message = 'could not reach authentication server';
          let reasonType = typeof (reason);

          if (reasonType === 'string') {
            // in case rails throws the standard error text at us
            message = reason.split('\n')[0];
          } else if (reasonType === 'object') {
            // normal auth errors
            message = reason.error;
          }

          self.set('errorMessage', message);
        }).then(function () {
          // close the modal
          // Ember.$('a.close-reveal-modal').trigger('click');
        });
    },

    hideError: function () {
      this.set('errorMessage', '');
    },
  },
});

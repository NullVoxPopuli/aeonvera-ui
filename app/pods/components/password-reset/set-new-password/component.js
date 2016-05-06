import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

export default Ember.Component.extend({
  flashMessages: Ember.inject.service(),

  password: null,
  passwordConfirmation: null,
  resetToken: null,

  errors: [],

  actions: {
    reset: function () {
      let url = ENV.host + '/api/users/password/';
      let data = {
        user: {
          password: this.get('password'),
          password_confirmation: this.get('passwordConfirmation'),
          reset_password_token: this.get('resetToken')
        },
      };

      Ember.$.ajax({
        url: url,
        type: 'PUT',
        data: data
      }).then(data => {
        this.sendAction('action');
      }, error => {
        let json = JSON.parse(error.responseText);
        let errors = json.errors;

        this.set('errors', errors);
      });
    },
  },

});

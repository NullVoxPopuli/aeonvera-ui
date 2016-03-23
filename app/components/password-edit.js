import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Component.extend({
  flashMessages: Ember.inject.service(),

  password: null,
  passwordConfirmation: null,
  resetToken: null,

  errors: Ember.computed('errors', function() {
    return this.get('model.errors');
  }),

  actions: {
    reset: function () {
      let url = ENV.host + '/api/users/password.json';
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

        Ember.run(_ => {
          let json = Ember.$.parseJSON(error.responseText);
          let errors = json.errors;
          let modelErrors = this.get('model.errors');
          modelErrors.clear();
          for (let field in errors) {
            modelErrors.add(field, errors[field]);
          }
        });
      });
    },
  },

});

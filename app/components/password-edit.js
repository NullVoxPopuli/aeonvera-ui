import Ember from 'ember';
import ENV from '../config/environment';
export default Ember.Component.extend({
  flashMessages: Ember.inject.service(),

  password: null,
  passwordConfirmation: null,
  resetToken: null,

  didInsertElement() {
    this._super(...arguments);
    let router = this.get('router.router');
    let routeWithQueryParams = router.getHandler('password-reset');
    let queryParams = routeWithQueryParams.get('queryParams');

    this.set('resetToken', queryParams.reset_password_token);
  },

  errors: Ember.computed('errors', function() {
    return this.get('model.errors');
  }),

  actions: {
    reset: function () {
      let _this = this;
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
        data: data,
        success: data => {
          _this.sendAction('action');
          let msg = 'Your password has been successfully reset. You may now login with your new password.';
          this.get('flashMessages').success(msg);
        },

        error: function (jqxhr, status, text) {
          let json = Ember.$.parseJSON(jqxhr.responseText);
          let errors = json.errors;
          let modelErrors = _this.get('model.errors');
          modelErrors.clear();
          for (let field in errors) {
            modelErrors.add(field, errors[field]);
          }
        },
      });
    },
  },

});

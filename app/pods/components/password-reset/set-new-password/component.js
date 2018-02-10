import { inject as service } from '@ember/service';
import Component from '@ember/component';
import ENV from 'aeonvera/config/environment';

export default Component.extend({
  ajax: service(),
  flashMessages: service(),

  password: null,
  passwordConfirmation: null,
  resetToken: null,

  errors: [],

  actions: {
    reset() {
      const ajax = this.get('ajax');
      const url = ENV.host + '/api/users/password/';
      const data = {
        user: {
          password: this.get('password'),
          password_confirmation: this.get('passwordConfirmation'),
          reset_password_token: this.get('resetToken')
        }
      };

      return ajax.put(url, { data })
        .then(() => this.sendAction('action'))
        .catch(error => {
          const errors = error.payload.errors;

          this.set('errors', errors);
        });
    }
  }

});

import { inject as service } from '@ember/service';
import Component from '@ember/component';
import ENV from 'aeonvera/config/environment';
import { computed } from 'ember-decorators/object';

export default Component.extend({
  ajax: service(),
  email: null,
  errors: [],

  @computed('errors')
  emailClass(errors) {
    if (errors.get('email') && errors.get('email').length > 0) {
      return 'error';
    }

    return errors.email;
  },

  actions: {
    reset() {
      const ajax = this.get('ajax');

      const url = ENV.host + '/api/users/password';
      const data = {
        user: {
          email: this.get('email')
        }
      };

      return ajax.post(url, { data })
        .then(() => this.sendAction('action'))
        .catch(error => {
          const errors = error.payload.errors;

          this.set('errors', errors);
        });
    }
  }
});

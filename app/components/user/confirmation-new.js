import $ from 'jquery';
import Component from '@ember/component';
import ENV from 'aeonvera/config/environment';

export default Component.extend({
  email: null,

  actions: {
    sendNewConfirmationToken() {
      const url = ENV.host + '/api/users/confirmation';
      const data = {
        user: {
          email: this.get('email')
        }
      };
      const _this = this;

      $.ajax({
        url: url,
        type: 'POST',
        data: data,
        success(data) {
          _this.get('router').transitionTo('confirmation.new-success');
        },

        error(jqxhr, status, text) {
          const json = JSON.parse(jqxhr.responseText);
          const errors = json.errors;

          _this.set('errors', errors);
        }
      });
    }
  }
});

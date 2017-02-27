import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

export default Ember.Component.extend({
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

      Ember.$.ajax({
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

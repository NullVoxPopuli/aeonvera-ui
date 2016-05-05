import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

export default Ember.Component.extend({
  email: null,

  actions: {
    sendNewConfirmationToken() {
      let url = ENV.host + '/api/users/confirmation';
      let data = {
        user: {
          email: this.get('email'),
        },
      };
      let _this = this;
      Ember.$.ajax({
        url: url,
        type: 'POST',
        data: data,
        success(data) {
          _this.get('router').transitionTo('confirmation.new-success');
        },

        error(jqxhr, status, text) {
          let json = JSON.parse(jqxhr.responseText);
          let errors = json.errors;
          _this.set('errors', errors);
        }
      });
    }
  }
});

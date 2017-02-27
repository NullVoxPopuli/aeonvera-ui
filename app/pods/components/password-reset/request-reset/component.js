import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

export default Ember.Component.extend({
  email: null,
  errors: [],

  emailClass: function() {
    const errors = this.get('errors');

    if (errors.get('email') && errors.get('email').length > 0) {
      return 'error';
    }

    return errors.email;
  }.property('errors'),

  actions: {
    reset: function() {
      const _this = this;
      const url = ENV.host + '/api/users/password';
      const data = {
        user: {
          email: this.get('email')
        }
      };

      Ember.$.ajax({
        url: url,
        type: 'POST',
        data: data,
        success: function(data) {
          _this.sendAction('action');
        },

        error: function(jqxhr, status, text) {
          const json = Ember.$.parseJSON(jqxhr.responseText);
          const errors = json.errors;

          _this.set('errors', errors);
        }
      });
    }
  }
});

import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

export default Ember.Component.extend({
  email: null,
  errors: [],

  emailClass: function () {
    var errors = this.get('errors');
    if (errors.get('email') && errors.get('email').length > 0) {
      return 'error';
    }

    return errors.email;
  }.property('errors'),

  actions: {
    reset: function () {
      let _this = this;
      let url = ENV.host + '/api/users/password';
      let data = {
        user: {
          email: this.get('email'),
        },
      };

      Ember.$.ajax({
        url: url,
        type: 'POST',
        data: data,
        success: function (data) {
          _this.sendAction('action');
        },

        error: function (jqxhr, status, text) {
          let json = Ember.$.parseJSON(jqxhr.responseText);
          let errors = json.errors;
          _this.set('errors', errors);
        },
      });
    },
  },
});

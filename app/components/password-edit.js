import Ember from 'ember';
import ENV from '../config/environment';
export default Ember.Component.extend({
  password: null,
  passwordConfirmation: null,

  errors: Ember.computed('errors', function(){
    return this.get('model.errors');
  }),

  actions: {
    reset: function () {
      let _this = this;
      let url = ENV.host + '/api/users/password.json';
      let data = {
        user: {
          password: this.get('password'),
          password_confirmation: this.get('passwordConfirmation')
        },
      };

      Ember.$.ajax({
        url: url,
        type: 'PUT',
        data: data,
        success: function (data) {
          _this.sendAction('action');
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

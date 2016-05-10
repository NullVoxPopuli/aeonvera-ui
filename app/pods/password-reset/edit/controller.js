import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: {
    passwordResetToken: 'reset_password_token'
  },
  passwordResetToken: null,
});

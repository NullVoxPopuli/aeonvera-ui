import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: {
    passwordResetToken: 'reset_password_token'
  },
  passwordResetToken: null
});

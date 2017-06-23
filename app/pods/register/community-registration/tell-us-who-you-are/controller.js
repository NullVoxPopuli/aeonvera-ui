import Ember from 'ember';
import computed, { alias, readOnly } from 'ember-computed-decorators';

const { isBlank, isPresent } = Ember;

export default Ember.Controller.extend({
  // these 3 fields are for if someone is not signed in
  firstName: '',
  lastName: '',
  email: '',

  @computed('firstName', 'lastName', 'email')
  formComplete(firstName, lastName, email) {
    return (
      isPresent(firstName) &&
      isPresent(lastName) &&
      isPresent(email)
    );
  },

  actions: {
    openLoginModal() {
      Ember.$('.auth-link a.login').click();
    },

    submitInformation() {
      const complete = this.get('formComplete');

      if (!complete) return;

      const firstName = this.get('firstName');
      const lastName = this.get('lastName');
      const email = this.get('email');

      this.transitionToRoute('register.community-registration.register', {
        queryParams: {
          firstName,
          lastName,
          email
        }
      });
    }
  }
});

import Ember from 'ember';
import { computed } from 'ember-decorators/object';
import { alias, readOnly } from 'ember-decorators/object/computed';


import { randomString } from 'aeonvera/mixins/helpers/string';

const { isBlank, isPresent, inject: { service } } = Ember;

export default class extends Ember.Controller {
  flash = service('flash-notification');
  //store = service('store');
  rollbar = service('rollbar');

  // these 3 fields are for if someone is not signed in
  firstName = '';
  lastName = '';
  email = '';

  @computed('firstName', 'lastName', 'email')
  formComplete(firstName, lastName, email) {
    return (
      isPresent(firstName) &&
      isPresent(lastName) &&
      isPresent(email)
    );
  }

  emailValidation = [{
    message: 'Please provide email in a valid format',
    validate(inputValue) {
      let emailPattern = /^[a-zA-Z0-9._\-\+]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;
      return emailPattern.test(inputValue);
    }
  }]

  actions = {
    openLoginModal() {
      Ember.$('.auth-link a.login').click();
    },

    submitInformation() {
      const complete = this.get('formComplete');

      if (!complete) return;

      const firstName = this.get('firstName');
      const lastName = this.get('lastName');
      const email = this.get('email');

      const token = randomString('order', 128);

      const organization = this.get('model');
      const store = this.get('store');
      const orderParams = {
        host: organization,
        userName: `${firstName}, ${lastName}`,
        userEmail: email,
        paymentToken: token
      };

      const order = store.createRecord('order', orderParams);
      order.save().then(() => {
        this.transitionToRoute('register.community-registration.register', {
          queryParams: {
            firstName,
            lastName,
            email,
            token
          }
        });
      }).catch(e => {
        this.get('rollbar').error('Organization Signup Failed', e);
        this.get('flash').alert('Could not create order...');
      });

    }
  }
}

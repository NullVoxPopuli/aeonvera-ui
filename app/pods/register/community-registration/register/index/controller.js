import Ember from 'ember';
import RSVP from 'rsvp';
import computed, { alias, readOnly } from 'ember-computed-decorators';

import currentUserHelpers from 'aeonvera/mixins/current-user-helpers';
import RegistrationController from 'aeonvera/mixins/registration/controller';

const { isBlank, isPresent, inject } = Ember;

export default Ember.Controller.extend(currentUserHelpers, RegistrationController, {
  store: inject.service('store'),
  flash: inject.service('flash-notification'),

  // for if someone is not signed in, they will be emailed a link
  // with a token that will give them access to the order
  queryParams: ['token', 'firstName', 'lastName', 'email'],
  token: null,
  firstName: null,
  lastName: null,
  email: null,

  @alias('model.organization') organization,
  @alias('organization') host,
  @alias('model.order') order,

  @computed('firstName', 'lastName')
  fullName(first, last) {
    return `${first} ${last}`;
  },

  @computed('fullName', 'currentUserName')
  userName(nonLoggedInName, currentUserName) {
    return currentUserName || nonLoggedInName;
  },

  @computed('email', 'currentUserEmail')
  userEmail(nonLoggedInEmail, currentUserEmail) {
    return currentUserEmail || nonLoggedInEmail;
  },

  actions: {
    didCheckout() {
      const order = this.get('order');

      this.transitionToRoute('register.community-registration.register.show', order.get('id'));
    }
  } // end actions
});

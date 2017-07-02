import Ember from 'ember';
import RSVP from 'rsvp';
import { computed } from 'ember-decorators/object';
import { alias, readOnly } from 'ember-decorators/object/computed';


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

  @alias('model.organization') organization: null,
  @alias('organization') host: null,
  @alias('model.order') order: null,

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
      const token = this.get('token');

      this.transitionToRoute('register.community-registration.register.show',
        order.get('id'), {
        queryParams: {
          token: token
        }
      });
    }
  } // end actions
});

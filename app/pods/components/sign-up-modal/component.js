import Ember from 'ember';
import { computed, action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';
import { alias } from 'ember-decorators/object/computed';


const successMessage = `
You will receive an email with instructions about how to confirm your account in a few minutes.`;

export default class SignUpModal extends Ember.Component {
  @service('path-store') pathStore;
  @service('flash-notification') flash;

  // for some reason this doesn't work as a @service
  // ... probably because no store interaction should happen in components
  store = Ember.inject.service('store');
  model = null;
  hasMadeAttempt = false;
  buttonClasses = 'signup';
  showSignupModal = false;

  constructor() {
    super(...arguments);
    const user = this.get('store').createRecord('user');

    this.set('model', user);
  }

  @alias('model.errors') errors;

  @computed('errors')
  emailClass(errors) {
    if (errors.get('email') && errors.get('email').length > 0) {
      return 'error';
    }

    return errors.email;
  }

  @action
  register() {
    this.get('pathStore').storeCurrentRoute();
    this.set('hasMadeAttempt', true);

    return this.get('model').save()
      .then(user => {
        this.set('showSignupModal', false);

        if (this.get('successAction')) this.sendAction('successAction');

        user.unloadRecord();

        this.get('flash').success(successMessage);
      });
  }
}

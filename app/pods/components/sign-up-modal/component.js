import Ember from 'ember';
import computed, { alias } from 'ember-computed-decorators';

const successMessage = `
You will receive an email with instructions about how to confirm your account in a few minutes.`;

export default class SignUpModal extends Ember.Component {
  pathStore = Ember.inject.service();
  store = Ember.inject.service();
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

  actions =  {
    register() {
      this.get('pathStore').storeCurrentRoute();
      this.set('hasMadeAttempt', true);

      Ember.Logger.info('before');

      return this.get('model').save()
        .then(user => {
          this.set('showSignupModal', false);
          Ember.Logger.info('after');
          if (this.get('successAction')) this.sendAction('successAction');
          user.unloadRecord();

          this.get('flashMessages').success(successMessage);
        })
        .catch(Ember.Logger.info);
    }
  }
};

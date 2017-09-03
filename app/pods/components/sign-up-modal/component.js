import Ember from 'ember';
import { computed, action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';
import { alias } from 'ember-decorators/object/computed';

export default class SignUpModal extends Ember.Component {
  @service('flash-notification') flash;
  @service('login') login;

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
  async register() {
    const model = this.get('model');

    this.set('hasMadeAttempt', true);

    try {
      await model.save();

      this.set('showSignupModal', false);

      await this.get('login').authenticate({
        identification: model.get('email'),
        password: model.get('password')
      });

      if (this.get('successAction')) this.sendAction('successAction');
    } catch (e) {
      this._handleSignupError(e);
    }


  }

  _handleSignupError(error) {
    this.set('errors', this.get('model.errors'));
  }
}

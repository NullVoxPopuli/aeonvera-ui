import Ember from 'ember';

import { computed, action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';

import { PropTypes } from 'ember-prop-types';

const { isBlank, isPresent } = Ember;

export default class extends Ember.Component {
  propTypes = {
    afterLogin: PropTypes.func
  };

  @service('login') login;


  @computed('login.errorMessage')
  showErrorMessage(msg) {
    return isBlank(msg) ? 'error-message-hidden' : '';
  }

  @action
  authenticate() {
    const credentials = this.getProperties('identification', 'password');
    const afterLogin = this.get('afterLogin');

    this.get('login')
      .authenticate(credentials, afterLogin)
      .then(() => {
        if (isPresent(this.get('afterLogin'))) {
          this.sendAction('afterLogin');
        }
      });
  }

  @action
  hideError() {
    this.set('errorMessage', '');
  }
}

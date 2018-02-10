import Component from '@ember/component';
import { isPresent, isBlank } from '@ember/utils';

import { computed, action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';

import { PropTypes } from 'ember-prop-types';

const HIDE_CLASS = 'error-message-hidden';

export default class extends Component {
  propTypes = {
    afterLogin: PropTypes.func
  };

  constructor() {
    super();

    this._handleError = this._handleError.bind(this);
  }

  @service('login') login;

  errorContainerClass = HIDE_CLASS;
  errorMessage = null;

  @action
  authenticate() {
    const credentials = this.getProperties('identification', 'password');
    const afterLogin = this.get('afterLogin');

    this.get('login')
      .authenticate(credentials, afterLogin)
      .then(() => afterLogin && this.sendAction('afterLogin'))
      .catch(this._handleError);
  }

  @action
  hideError() {
    this.set('errorMessage', '');
    this.set('errorContainerClass', HIDE_CLASS);
  }

  _handleError(e) {
    this.set('errorContainerClass', '');
    this.set('errorMessage', e);
  }
}

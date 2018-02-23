import Component from '@ember/component';
import { isPresent, isBlank } from '@ember/utils';

import { action } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';
import { notEmpty } from '@ember-decorators/object/computed';


const FALLBACK_ERROR = 'Could not login. Please Contact Support.'

export default class LoginForm extends Component {
  @service('login') login;

  afterLogin?: () => void;
  errorMessage?: string = null;
  identification: string;
  password: string;

  @notEmpty('errorMessage') hasError;

  @action
  authenticate() {
    const afterLogin = this.get('afterLogin');
    const credentials = {
      identification: this.get('identification'),
      password: this.get('password')
    };

    this.get('login')
      .authenticate(credentials, afterLogin)
      .then(() => afterLogin && this.sendAction('afterLogin'))
      .catch(e => {
        this.set('errorMessage', e || FALLBACK_ERROR);
      });
  }

  @action
  hideError() {
    this.set('errorMessage', '');
  }
}

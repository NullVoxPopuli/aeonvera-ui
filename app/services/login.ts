import Service from '@ember/service';
import RSVP from 'rsvp';

import { isPresent } from '@ember/utils';
import { task } from 'ember-concurrency';
import { service } from '@ember-decorators/service';

export default class Login extends Service {
  @service('session') session;
  @service('current-user') currentUser;
  @service('flash-notification') flash;
  @service('i18n') i18n;
  @service('router') router;

  errorMessage = null;

  authenticate(credentials) {
    return this.get('auth').perform(credentials);
  }

  logoutAndRedirect() {
    this.get('session').invalidate();
    this.get('router').transitionTo('welcome');
  }

  auth = task(function * (credentials) {
    const session = this.get('session');
    try {
      const result = yield session.authenticate('authenticator:token', credentials);
      this._handleAuthenticationSuccess(result);
    } catch (e) {
      this._handleAuthenticationError(e);
    }
  });


  _handleAuthenticationSuccess(json) {
    const i18n = this.get('i18n');

    // yay - trigger the currentUser computed property to force a fetch
    return RSVP.resolve(this.get('currentUser.user'))
      .then(user => {
        const msg = user ?
          i18n.t('greetings.namedLoginSuccess', { name: user.get('firstName') }) :
          i18n.t('greetings.genericLoginSuccess');

        this.get('flash').success(msg);
      });
  }

  _parseErrorMessage(error) {
    let message = error;
    const reasonType = typeof message;

    if (reasonType === 'string') {
      // in case rails throws the standard error text at us
      message = message.split('\n')[0];
    } else if (reasonType === 'object') {
      // normal (devise) auth errors
      message = error.error;
    }

    return message;
  }


  _handleAuthenticationError(error) {
    const message = this._parseErrorMessage(error);

    this.set('errorMessage', message);
    throw message;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'login': Login;
  }
}

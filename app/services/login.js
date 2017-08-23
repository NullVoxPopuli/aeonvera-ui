import Ember from 'ember';
import RSVP from 'rsvp';

import { service } from 'ember-decorators/service';

const { isPresent } = Ember;

export default class extends Ember.Service {
  @service('session') session;
  @service('current-user') currentUser;
  @service('flash-notification') flash;
  @service('i18n') i18n;

  errorMessage = null;

  authenticate(credentials) {
    return this.get('session')
      .authenticate('authenticator:token', credentials)
      .then(this._handleAuthenticationSuccess.bind(this))
      .catch(this._handleAuthenticationError.bind(this));
  }


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
      // normal auth errors
      message = error.error;
    }

    return message;
  }


  _handleAuthenticationError(error) {
    const message = this._parseErrorMessage(error);

    this.set('errorMessage', message);
  }
}

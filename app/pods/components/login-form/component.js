import Ember from 'ember';
import computed from 'ember-computed-decorators';
import { PropTypes } from 'ember-prop-types';

const { isPresent } = Ember;
const { service } = Ember.inject;

export default Ember.Component.extend({
  propTypes: {
    afterLogin: PropTypes.func
  },
  session: service('session'),
  flashMessages: Ember.inject.service(),

  @computed('errorMessage')
  showErrorMessage(msg) {
    return Ember.isBlank(msg) ? 'error-message-hidden' : '';
  },

  actions: {
    authenticate: function() {
      const credentials = this.getProperties('identification', 'password');

      this.get('session')
        .authenticate('authenticator:token', credentials)
        .then(this._handleAuthenticationSuccess.bind(this))
        .catch(this._handleAuthenticationError.bind(this));
    },

    hideError: function() {
      this.set('errorMessage', '');
    }
  }, // end actions


  _handleAuthenticationSuccess(json) {
    // yay
    this.get('flashMessages').success('You have successfully logged in');

    if (isPresent(this.get('afterLogin'))) {
      this.sendAction('afterLogin');
    }
  },

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
  },


  _handleAuthenticationError(error) {
    const message = this._parseErrorMessage(error);

    this.set('errorMessage', message);
  }
});

import Ember from 'ember';
import RSVP from 'rsvp';

import { escapeHTML } from 'aeonvera/helpers/string/escape-html';
import { messageFromError } from 'aeonvera/helpers/message-from-error';

const { inject, isPresent, isBlank } = Ember;

export default Ember.Service.extend({
  rollbar: inject.service('rollbar'),
  notifications: inject.service('notification-messages'),
  options: { autoClear: true, clearDuration: 3200, htmlContent: true },

  // example:
  //   this.get('flash').notify({
  //     begin: 'beginning message',
  //     success: 'success message',
  //     error: 'error message',
  //   });
  //
  // TODO: should there be a warning alternative if failure isn't present?
  async notify(messages = {}, promise = null) {
    const notifier = this.get('notifications');
    const options = this.get('options');
    const { begin, success, error, rollbar } = messages;

    if (begin) notifier.info(begin, options);

    try {
      const result = await promise;
      if (success) {
        notifier.clearAll();
        notifier.success(success, options);
      }

      return RSVP.resolve(result);
    } catch (e) {
      return this._notifyHandleError(error, rollbar, e);
    }
  },

  info(message, optionsOverride = {}) {
    const notifier = this.get('notifications');
    const options = { ...this.get('options'), ...optionsOverride };

    notifier.info(message, optionsOverride);
  },

  warning(message, optionsOverride = {}) {
    const notifier = this.get('notifications');
    const options = { ...this.get('options'), ...optionsOverride };

    notifier.warning(message, optionsOverride);
  },

  success(message, optionsOverride = {}) {
    const notifier = this.get('notifications');
    const options = { ...this.get('options'), ...optionsOverride };

    notifier.success(message, options);
  },

  alert(message, optionsOverride = {}) {
    this.error(message, optionsOverride);
  },

  error(e, optionsOverride = {}) {
    const notifier = this.get('notifications');
    const options = { ...this.get('options'), clearDuration: 10000, ...optionsOverride };
    const message = this._messageFromError(e);

    notifier.error(message, options);

    Ember.Logger.error(e);
  },

  _messageFromError(error) {
    const msgTemplate = (title, details) => `<span><strong>${title}</strong><br />${details}</span>`;

    return messageFromError(error, msgTemplate);
  },

  _notifyHandleError(error, rollbar, e) {
    const notifier = this.get('notifications');
    const message = e.message;

    if (error) {
      if (rollbar) this.get('rollbar').error(e);

      notifier.clearAll();
      this.error(`<span><strong>${error}</strong><br /> ${message}</span>`);
    }

    return RSVP.reject(e);
  }
});

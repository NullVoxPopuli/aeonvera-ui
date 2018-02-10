import Service, { inject as service } from '@ember/service';

// This is a shim for helping migrate from
// ember-cli-flash
// to
// ember-cli-notifications
// ember-cli-flash is very foundation-y
// and the notifications look more like toasts, and are much friendlier
export default class extends Service {
  flash = service('flash-notification');

  success(msg) {
    this.get('flash').success(msg);
  }

  alert(msg) {
    this.get('flash').alert(msg);
  }

  warning(msg) {
    this.get('flash').warning(msg);
  }

  info(msg) {
    this.get('flash').info(msg);
  }
}

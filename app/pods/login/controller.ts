import Controller from '@ember/controller';

import { action } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';

export default class LoginController extends Controller {
  @service('session') session;

  @action
  didAuthenticate() {
    this.get('store').unloadAll();
  }
}

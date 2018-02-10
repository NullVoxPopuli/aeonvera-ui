import Controller from '@ember/controller';

import { service } from 'ember-decorators/service';
import { alias } from 'ember-decorators/object/computed';

export default class extends Controller {
  @service('session') session;
  @alias('session.isAuthenticated') isAuthenticated;
}

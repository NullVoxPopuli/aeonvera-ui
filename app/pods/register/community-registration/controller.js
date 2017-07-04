import Ember from 'ember';

import { service } from 'ember-decorators/service';
import { alias } from 'ember-decorators/object/computed';

export default class extends Ember.Controller {
  @service('session') session;
  @alias('session.isAuthenticated') isAuthenticated;
}

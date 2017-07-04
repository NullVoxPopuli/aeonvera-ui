import Ember from 'ember';

import { service } from 'ember-decorators/service';
import { alias } from 'ember-decorators/object/computed';

export default class extends Ember.Component {
  @service('current-user') currentUserService;
  @alias('currentUserService.user') currentUser;
}

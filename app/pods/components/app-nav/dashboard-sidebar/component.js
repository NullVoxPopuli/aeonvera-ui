import Component from '@ember/component';

import { service } from 'ember-decorators/service';
import { alias } from 'ember-decorators/object/computed';

export default class extends Component {
  @service('current-user') currentUserService;
  @alias('currentUserService.user') currentUser;
}

import Component from '@ember/component';

import { inject as service } from '@ember/service';

import { action } from '@ember-decorators/object';

export default class AppNavUserMenu extends Component {
  // @service('session') session;
  session = service('session');
  currentUser = service('current-user') currentUser;

  @action
  logout() {
    this.get('session').invalidate();
  }
};

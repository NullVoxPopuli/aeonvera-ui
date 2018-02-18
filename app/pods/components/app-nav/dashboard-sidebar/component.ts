import Component from '@ember/component';

import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default class DashboardSidebar extends Component {
  currentUserService = service('current-user');
  sideNavigation = service('sideNavigation');
  currentUser = alias('currentUserService.user');
}

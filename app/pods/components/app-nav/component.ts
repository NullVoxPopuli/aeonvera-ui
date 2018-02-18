import Component from '@ember/component';

import { inject as service } from '@ember/service';
import Computed, { alias } from '@ember/object/computed';

export default class AppNav extends Component {
  // normal class body definition here
  sideNavigation = service('side-navigation');
  session: Computed<any> = service('session');
  login = service('login');
  navbarTitle = service('navbar-title');

  navTitle = alias('navbarTitle.navTitle');
  isSidebarEnabled = alias('sideNavigation.isEnabled');
};

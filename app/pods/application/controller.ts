import Controller from '@ember/controller';

import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default class Application extends Controller {
  flashMessages = service('flash-notification');
  session = service('session');
  navbarTitle = service('navbar-title');
  sideNavigation = service('side-navigation');

  showSidebar = alias('sideNavigation.isEnabled');
  isSidebarOpen = alias('sideNavigation.open');

  navTitle = alias('navbarTitle.navTitle');
  title = alias('navbarTitle.title');
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'application': Application;
  }
}

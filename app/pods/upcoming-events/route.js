import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';


export default class UpcomingEvents extends Route {
  i18n = service('i18n');
  navbarTitle = service('navbar-title');

  activate() {
    const navbarTitle = this.get('navbarTitle');
    const title = this.get('i18n').t('upcomingevents');

    navbarTitle.setTitle(title);

    this._super();
  }

  model() {
    return this.store.findAll('upcoming-event');
  }
}

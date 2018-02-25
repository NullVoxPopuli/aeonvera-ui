import Route from '@ember/routing/route';
import RSVP from 'rsvp';

import { service } from '@ember-decorators/service';

export default class DashboardIndex extends Route {
  @service('i18n') i18n;
  @service('navbar-title') navbarTitle;

  model() {
    // TODO: make one call to the current user, and include these relationships
    const upcoming = this.store.findAll('upcoming-event');
    const hosted = this.store.findAll('event-summary');
    const registrations = this.store.findAll('users/registration');

    return RSVP.hash({ upcoming, hosted, registrations });
  }

  afterModel() {
    const navbarTitle = this.get('navbarTitle');
    const title = this.get('i18n').t('appname');

    navbarTitle.setTitle(title);
  }
}

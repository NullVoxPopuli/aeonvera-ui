import Route from '@ember/routing/route';
import RSVP from 'rsvp';

import { service } from '@ember-decorators/service';

export default class DashboardIndex extends Route {
  @service('i18n') i18n;
  @service('navbar-title') navbarTitle;

  model() {
    const upcoming = this.store.findAll('upcoming-event');
    const hosted = this.store.query('event-summary', {
      q: {
        starts_at_gteq: new Date()
      }
    });

    return RSVP.hash({ upcoming, hosted });
  }

  afterModel() {
    const navbarTitle = this.get('navbarTitle');
    const title = this.get('i18n').t('appname');

    navbarTitle.setTitle(title);
  }
}

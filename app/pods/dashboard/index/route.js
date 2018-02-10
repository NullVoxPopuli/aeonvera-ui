import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import SetNavBarTitle from 'aeonvera/mixins/routes/set-navbar-title';

export default Route.extend(SetNavBarTitle, {
  i18n: service(),

  model() {
    const upcoming = this.store.findAll('upcoming-event');
    const hosted = this.store.query('event-summary', {
      q: {
        starts_at_gteq: new Date()
      }
    });

    return RSVP.hash({ upcoming, hosted });
  },

  afterModel() {
    this._setAppNavTitle(this.get('i18n').t('appname'));
  }
});

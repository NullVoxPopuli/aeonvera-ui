import Ember from 'ember';
import RSVP from 'rsvp';
import SetNavBarTitle from 'aeonvera/mixins/routes/set-navbar-title';

const { inject } = Ember;

export default Ember.Route.extend(SetNavBarTitle, {
  i18n: inject.service(),

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

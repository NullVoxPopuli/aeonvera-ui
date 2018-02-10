import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { w } from '@ember/string';
import { computed } from 'ember-decorators/object';
import { not } from 'ember-decorators/object/computed';
import SideNav from 'aeonvera/mixins/routes/set-navbar-title';

const eventInclude = w(`
  packages
  shirts
  levels
  competitions
  line_items
  custom_fields
  sponsorships
  pricing_tiers
`).join(',');

export default Route.extend(SideNav, {
  session: service(),
  i18n: service(),


  // TODO: maybe eventually make requiring to login optional?
  @not('session.isAuthenticated') mustLogin: null,

  model(params) {
    return this.store.findRecord('event', params.id, { include: eventInclude });
  },

  afterModel(model, transition) {
    if (!model.get('registrationIsOpen')) {
      return this.transitionTo('register.event-registration.not-yet', model);
    }

    if (this.get('mustLogin')) {
      return this.transitionTo('register.event-registration.must-login', model);
    }

    this._showSideNav();

    const name = model.get('name');
    const i18n = this.get('i18n');

    this._setAppNavTitle(name);
    this.set('title', `${name} - ${i18n.t('appname')}`);
  }

});

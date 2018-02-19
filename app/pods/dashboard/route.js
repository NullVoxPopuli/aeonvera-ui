import Route from '@ember/routing/route';
import AuthenticatedUi from 'aeonvera/mixins/authenticated-ui';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

import { service } from '@ember-decorators/service';

export default class Dashboard extends Route.extend(
  AuthenticatedUi, AuthenticatedRouteMixin, { /* ... prototype */ }) {

  @service('i18n') i18n;
  @service('navbar-title') navbarTitle;

  authenticationRoute = 'login';

  afterModel() {
    const name = this.get('i18n').t('appname');

    this.get('navbarTitle').setTitle(name);
  }
};

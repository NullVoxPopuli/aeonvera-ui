import Route from '@ember/routing/route';
import { service } from '@ember-decorators/service';

// import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
// UnauthenticatedRouteMixin,
export default class Welcome extends Route {
  @service('i18n') i18n;
  @service('navbar-title') navbarTitle;

  sessionAuthenticated() {
    this.transitionTo('dashboard');
  }

  afterModel() {
    const name = this.get('i18n').t('appname');

    this.get('navbarTitle').setTitle(name);
  }

}

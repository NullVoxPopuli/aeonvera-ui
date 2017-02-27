import Ember from 'ember';
import SetSidebar from 'aeonvera/mixins/routes/set-sidebar';

// import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
// UnauthenticatedRouteMixin,
export default Ember.Route.extend(SetSidebar, {
  i18n: Ember.inject.service(),

  activate: function() {
    this.set('title', this.get('i18n').t('appname'));
    this._super();
  },

  afterModel() {
    this._setMobileLeftMenu('nav/welcome/left-items');
  },

  sessionAuthenticated() {
    this.transitionTo('dashboard');
  },

  actions: {
    openLoginModal() {
      Ember.$('.auth-link a.login').click();
    }
  }
});

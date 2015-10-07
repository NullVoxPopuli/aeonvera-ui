import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  i18n: Ember.inject.service(),

  activate: function() {
    this.set('title', this.get('i18n').t('appname'));
    this._super();
  }
});

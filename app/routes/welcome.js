import Ember from 'ember';
// import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
//UnauthenticatedRouteMixin, 
export default Ember.Route.extend({
  i18n: Ember.inject.service(),

  activate: function() {
    this.set('title', this.get('i18n').t('appname'));
    this._super();
  }
});
